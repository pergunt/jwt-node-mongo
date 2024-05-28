import nodemailer from 'nodemailer'

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,

    API_URL
} = process.env

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    }
})

export const sendActivation = async (to, link) => {
    transporter.sendMail({
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
