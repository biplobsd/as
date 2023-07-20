import log from "src/utils/logger";

const manifest = chrome.runtime.getManifest();

const settings = {
  client_id: manifest.oauth2!.client_id,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  redirect_uri: chrome.identity.getRedirectURL("provider_cb"),
};

export const apiUrl = {
  webAuth: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://www.googleapis.com/oauth2/v3/token",
  tokenInfo: "https://www.googleapis.com/oauth2/v3/tokeninfo",
  revoke: "https://oauth2.googleapis.com/revoke",
};

export async function logout() {
  const accessToken = await getAccessToken();
  if (accessToken) {
    let params = `?token=${accessToken}`;
    const url = `${apiUrl.revoke}${params}`;
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (e) {
      log.error(e);
    }
  }
  await chrome.storage.local.clear();
}

const getExpirationDate = (dateFrom: Date, expireInMinutes: number): number => {
  dateFrom.setMinutes(dateFrom.getMinutes() + expireInMinutes);

  return dateFrom.getTime();
};

const getTokens = async (code: string) => {
  let params = `?code=${code}`;
  params += `&client_id=${settings.client_id}`;
  params += `&client_secret=${settings.client_secret}`;
  params += `&redirect_uri=${settings.redirect_uri}`;
  params += "&grant_type=authorization_code";

  const url = `${apiUrl.token}${params}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const jsonRes = (await response.json()) as {
    access_token: string;
    refresh_token: string;
  };
  await chrome.storage.local.set({
    ...jsonRes,
    expiration: getExpirationDate(new Date(), 45),
  });
  return jsonRes.access_token;
};

export const initialize = async () => {
  let params = `?client_id=${settings.client_id}`;
  params += `&scope=${manifest.oauth2!.scopes!.join(" ")}`;
  params += `&redirect_uri=${settings.redirect_uri}`;
  params += "&response_type=code";
  params += "&access_type=offline";
  params += "&prompt=consent";
  const responseUrl = await chrome.identity.launchWebAuthFlow({
    url: apiUrl.webAuth + params,
    interactive: true,
  });
  if (responseUrl) {
    const url = new URL(responseUrl);
    const searchParams = url.searchParams;

    const codeParam = searchParams.get("code");
    if (!codeParam) {
      return undefined;
    }
    return getTokens(codeParam);
  } else {
    log.info(chrome.runtime.lastError);
  }
  return undefined;
};

const getAccessToken = async () => {
  try {
    return (await chrome.storage.local.get(["access_token"]))
      .access_token as string;
  } catch (error) {
    return undefined;
  }
};

const getRefreshToken = async () => {
  try {
    return (await chrome.storage.local.get(["refresh_token"]))
      .refresh_token as string;
  } catch (error) {
    return undefined;
  }
};

const getExpiration = async () => {
  try {
    return (await chrome.storage.local.get(["expiration"]))
      .expiration as number;
  } catch (error) {
    return undefined;
  }
};

export const getAuthToken = async () => {
  const access_token = await getAccessToken();
  if (!access_token) {
    return await initialize();
  }

  if (await tokenExpired()) {
    return await revokeTokens();
  }

  const validate_access_token = await validateTokens();
  if (validate_access_token) {
    return validate_access_token;
  }

  return await initialize();
};

const validateTokens = async () => {
  const access_token = getAccessToken();

  const response = await fetch(
    `${apiUrl.tokenInfo}?access_token=${access_token}`,
    {
      method: "GET",
    }
  );

  if (response.status != 200) {
    return await revokeTokens();
  }
  return undefined;
};

export const revokeTokens = async () => {
  const refreshToken = await getRefreshToken();

  let params = `?refresh_token=${refreshToken}`;
  params += `&client_id=${settings.client_id}`;
  params += `&client_secret=${settings.client_secret}`;
  params += "&grant_type=refresh_token";

  const data = await fetch(`${apiUrl.token}${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { access_token } = (await data.json()) as { access_token: string };

  await chrome.storage.local.set({
    access_token,
    expiration: getExpirationDate(new Date(), 45),
  });
  return access_token;
};

export const tokenExpired = async () =>
  Number((await getExpiration()) ?? 0) < new Date().getTime();
