import { env } from '@treviaz/env'

export const CreateInviteMail = ({ token }: { token: string }) => ({
  pt: {
    title: '[Treviaz] - Você foi convidade para participar de um condominio!.',
    body: `<html lang="pt-br" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          table, td, div, h1, p {font-family: Arial, sans-serif;}
        </style>
      </head>
      <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                <tr>
                  <td align="center" style="padding:40px 0 30px 0;">
                    <img src="https://i.ibb.co/QQQWNQF/imagine-image-5c444bb6-5779-495d-a327-c1b7b75363ca.png" alt="" width="300" style="height:auto;display:block;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 30px 42px 30px;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 36px 0;color:#153643;">
                          <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Treviaz - Você foi convidade para participar de um condominio!</h1>
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Você foi convidado a participar do nosso condomínio pelo sistema Treviaz! É uma honra tê-lo como parte da nossa comunidade, onde proporcionamos um ambiente colaborativo e organizado para a gestão de todas as necessidades e facilidades do seu condomínio.</p>
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Para aceitar o convite e acessar todas as funcionalidades exclusivas do condomínio, siga o link abaixo:</p>
                          <a href="${env.NEXT_PUBLIC_WEB_BASE_URL}/invite?code=${token}" style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;font-style: italic;">Aceitar Convite</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`,
  },
})
