import { VercelRequest, VercelResponse } from '@vercel/node';
import Mailjet from 'node-mailjet'
import Helpers from './_helpers'

export default function (req: VercelRequest, res: VercelResponse) {
  const { email, hash } = req.query;

  if (!email || !hash) {
    res.status(400).json({
      body: {
        error: true,
        message: 'missing email or hash',
      },
      status: 400,
    });
  }

  if (!Helpers.isValidHash(email as string, hash as string)) {
    res.status(400).json({
      body: {
        error: true,
        message: 'hash not valid',
      },
      status: 400,
    });
    return
  }

  // TODO: replace this crappy package
  const mailjet = new Mailjet(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  )
  const request = mailjet
    .post('contactslist', { version: 'v3' })
    .id(parseInt(process.env.MJ_CONTACT_LIST_ID))
    .action('managecontact')
    .request({
      Action: 'addnoforce',
      Email: email
    })

  request
    .then((result) => {
      res.status(200).json({
        body: {
          success: true,
          // res: result.body,
        },
        status: 200,
      });
    })
    .catch((err) => {
      res.status(err.statusCode).json({
        body: {
          error: true,
        },
        status: err.statusCode,
      });
    })
}
