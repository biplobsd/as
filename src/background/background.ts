import { getAuthToken, logout } from "src/api/authorization";
import {
  type RuntimeMessage,
  runtimeMessageSchema,
  runtime,
} from "src/utils/communication";

import log from "src/utils/logger";

let isWorking = false;

export async function acceptSignalSend() {
  await runtime.send({
    type: "statusOption",
    status: {
      msg: "[Background script] Ready for accept request",
      code: "accept",
    },
  });
}

async function checkIsWorking() {
  if (isWorking) {
    await runtime.send({
      type: "statusOption",
      status: { code: "error", msg: "Background script is working ..." },
    });
    return true;
  }
  return false;
}

export async function parseData(dataLocal: RuntimeMessage) {
  const validationResult = await runtimeMessageSchema.safeParseAsync(dataLocal);

  if (!validationResult.success) {
    log.error("Error when parsing data");
    return;
  }

  const dataParsed = validationResult.data;
  const status = dataParsed.status;
  log.info(status.msg);
  if (dataParsed.type === "status" || dataParsed.type === "statusBackground") {
    switch (status.code) {
      case "ready":
        if (isWorking) {
          await runtime.send({
            type: "statusOption",
            status: {
              code: "error",
              msg: "Background script is working ...",
            },
          });
        } else {
          await acceptSignalSend();
        }
        break;
      case "authToken":
        if (await checkIsWorking()) return;

        isWorking = true;

        await runtime.send({
          type: "statusOption",
          status: { code: "loading", msg: "Getting access token..." },
        });

        try {
          const access_token = await getAuthToken();
          if (!access_token) {
            throw new Error("access token undefined");
          }

          await runtime.send({
            type: "dataOptionAuthToken",
            status: {
              code: "authTokenSuccessful",
              msg: "OAuth Token sending to the option/popup script",
            },
            authToken: access_token,
          });

          return;
        } catch (error) {
          log.error(error);

          try {
            await runtime.send({
              type: "statusOption",
              status: {
                code: "error",
                msg: "Error: Unable to get the OAuth token.",
              },
            });
          } catch (error) {
            log.error(error);
          }
        } finally {
          isWorking = false;
        }

        break;
      case "logout":
        try {
          if (await checkIsWorking()) return;

          await runtime.send({
            type: "statusOption",
            status: { code: "loading", msg: "Removing all tokens..." },
          });

          await logout();
          await runtime.send({
            type: "statusOption",
            status: {
              msg: "[Background script] Logout Successful",
              code: "logoutSuccessful",
            },
          });
        } catch (error) {
          log.error(error);
        } finally {
          isWorking = false;
        }

      default:
        break;
    }
  }
}
