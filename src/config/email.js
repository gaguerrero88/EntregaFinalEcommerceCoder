import nodemailer from "nodemailer"
import { config } from "./config.js"

export const transporter = nodemailer.createTransport ({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: config.gmail.account,
        pass: config.gmail.password
    },
    tls: {
        rejectUnauthorized: false
    }
})