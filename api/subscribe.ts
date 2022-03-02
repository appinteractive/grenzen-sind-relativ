import { VercelRequest, VercelResponse } from '@vercel/node';
import Mailjet from 'node-mailjet'
import Helpers from './_helpers'

export default function (req: VercelRequest, res: VercelResponse) {
  const { email } = req.body;
  const host = `https://${req.headers['host']}`
  const link = Helpers.link(email as string, host)

  const mailjet = new Mailjet(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  )
  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'mail@grenzensindrelativ.de',
            Name: 'Grenzen sind Relativ e.V.'
          },
          To: [
            {
              Email: email
            }
          ],
          TemplateID: parseInt(process.env.MJ_SUBSCRIBE_TEMPLATE_ID),
          TemplateLanguage: true,
          Subject: 'GSR e.V. Newsletter bestätigen',
          Variables: {
            confirmation_link: link
          }
        }
      ],
      // SandboxMode: true,
    })

  request
    .then((result) => {
      res.status(200).json({
        body: {
          success: true,
        },
        status: 200,
      });
    })
    .catch((err) => {
      console.log(err.message)
      res.status(err?.statusCode || 500).json({
        body: {
          error: true,
        },
        status: err?.statusCode || 500,
      });
    })
}
