import nodemailer from 'nodemailer'

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,

    API_URL
} = process.env


class MailService {
    constructor() {

        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            }
        })
    }

    async sendActivation(to, link) {
        this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: `Account activation ${API_URL}`,
            text: '',
            html: `
                <div>
                    <h1>Account activation</h1>
                    <a href="${link}" target="_blank">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService()
