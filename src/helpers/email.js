import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/email.js";

export const generateEmailToken = (email, expireTime) => {
  const token = jwt.sign({ email }, config.gmail.secretToken, { expiresIn: expireTime });
  return token;
};

export const sendChangePasswordEmail = async (req, email, token) => {
  const domain = `${req.protocol}://${req.get("host")}`;
  const link = `${domain}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: '"Ecommerce" <ecommerce@example.com>',
    to: email,
    subject: "Reestablecer password",
    html: `<div>
     <h2> Hola, </h2>
     <p> Solicitaste restablecer el password, da click en el siguiente boton:</p>
     <a href=${link}>
     <button>
     Restablecer password
     </button>
     </a>
    </div>
    `,
  });
};

export const sendDletedUserEmail = async (req, email) => {
  const domain = `${req.protocol}://${req.get("host")}/register`;
  await transporter.sendMail({
    from: '"Ecommerce" <ecommerce@example.com>',
    to: email,
    subject: "Cuenta Eliminada por inactividad",
    html: `<div>
     <h2> Hola, </h2>
     <p> Su cuenta ha sido eliminado por una inactivdad mayor a 2 dias si desea volver a 
     registrarse haga click en el siguiente boton: </p>
     <a href=${domain}>
     <button>
     Pagina Principal
     </button>
     </a>
    </div>
    `,
  });
};

export const sendProductDeleteEmail = async (req, email, product) => {
  const domain = `${req.protocol}://${req.get("host")}/register`;
  await transporter.sendMail({
    from: '"Ecommerce" <ecommerce@example.com>',
    to: email,
    subject: "Producto Eliminado",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
    <h2 style="color: #333;">Hola,</h2>
    <p>El siguiente producto que te pertenece ha sido eliminado:</p>
    <ul style="list-style-type: none; padding: 0;">
        <li><strong>Título:</strong> ${product.title}</li>
        <li><strong>Descripción:</strong> ${product.description}</li>
        <li><strong>Código:</strong> ${product.code}</li>
    </ul>
    <p>
        Puedes visitar la <a href="${domain}" style="color: #007bff; text-decoration: none;">Página Principal</a>.
    </p>
</div>
    `,
  });
};


export const sendTicketEmail = async (req, email,ticket) => {
  const domain = `${req.protocol}://${req.get("host")}/register`;
  await transporter.sendMail({
    from: '"Ecommerce" <ecommerce@example.com>',
    to: email,
    subject: "Ticket de compra",
    html: `<div>
     <h2> Hola, </h2>
     <p> A continuacion podra ver el monto total de su compra: $${ticket.amount} </p>
     <a href=${domain}>
     <button>
     Pagina Principal
     </button>
     </a>
    </div>
    `,
  });
};

export const verifyEmailToken = (token) => {
  try {
    const info = jwt.verify(token, config.gmail.secretToken);
    return info.email;
  } catch (error) {
    return null;
  }
};
