const nodemailer = require('nodemailer')

module.exports = {
  sendVerificationEmail: async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        //text: text,
        html: `<p>Veuillez vérifier votre adresse e-mail pour terminer l'inscription . </p>
			<p> Ce lien <b>expire dans 1 heure</b> .</p>
			<p>Cliquez <a href=${text}>ici</a> pour coninuer </p>`,
      })
      console.log('email envoyé avec succes')
    } catch (error) {
      console.log("email n'est pas envoyé")
      console.log(error)
      return error
    }
  },
  sendForgotPasswordEmail: async (email, url) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Réinitialiser votre mot de passe',
        //text: text,
        html: `<p>Veuillez réinitialiser votre mot de passe . </p>
			<p> Ce lien <b>expire dans 1 heure</b> .</p>
			<p>Cliquez <a href=${url}>ici</a> pour coninuer </p>`,
      })
      console.log('email envoyé avec succes')
    } catch (error) {
      console.log("email n'est pas envoyé")
      console.log(error)
      return error
    }
  },

  continuerSingUp: async (email, url) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Continuer les étapes pour inscription',
        html: `<p>Veuillez remplir les champs manquantes pour avoir un compte. </p>
			 <p>Cliquez <a href=${url}> ici </a> pour coninuer </p>`,
      })
      console.log('email envoyé avec succes')
    } catch (error) {
      console.log("email n'est pas envoyé")
      console.log(error)
      return error
    }
  },

  sendAcceptEmail: async (email, url) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Acceptation de l'inscription",
        //text: text,
        html: `<p>Administrateur à accepter votre inscription. </p>
			<p>Cliquez <a href=${url}> ici </a> pour se connecter </p>`,
      })
      console.log('email envoyé avec succes')
    } catch (error) {
      console.log("email n'est pas envoyé")
      console.log(error)
      return error
    }
  },

  sendAcceptResEmail: async (email, salle, date, dateDe, DateVers) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'La réservation',
        //text: text,
        html: `<p>Votre réservation est acceptée, qui aura lieu dans salle "${salle}" le ${date} de ${dateDe} vers ${DateVers}</p>`,
      })
      console.log('email envoyé avec succes')
    } catch (error) {
      console.log("email n'est pas envoyé")
      console.log(error)
      return error
    }
  },
  sendRemiderEmail: async (email, salle) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      })
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Rappel de votre réservation ',
        //text: text,
        html: `<p>Votre réservation est dans 15 minutes, qui aura lieu dans salle "${salle}"</p>`,
      })
      console.log('email envoyé avec succes')
    } catch (error) {
      console.log("email n'est pas envoyé")
      console.log(error)
      return error
    }
  },
}
