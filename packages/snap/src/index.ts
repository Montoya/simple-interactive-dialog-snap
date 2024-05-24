import type { OnRpcRequestHandler, OnUserInputHandler } from '@metamask/snaps-sdk';
import { panel, text, button } from '@metamask/snaps-sdk';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      const interfaceId = await snap.request({
        method: "snap_createInterface",
        params: {
          ui: panel([
            button({ 
              value: 'One', 
              buttonType: 'button',
              name: 'btn-one'
            }),
            button({
              value: 'Two',
              buttonType: 'button',
              name: 'btn-two'
            })
          ]),
        },
      });
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          id: interfaceId
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const OnUserInput: OnUserInputHandler = async ({ id, event }) => { 
  await snap.request({
    method: "snap_updateInterface", 
    params: { 
      id,
      ui: panel([
        text(`${event.name}`)
      ]),
    },
  }); 
}