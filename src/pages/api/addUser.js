import { auth } from '../../services/firebase/server'

export default async function handler(req, res) {
  try {
    const { uid } = await auth.createUser({
      email: 'comunicacion@delicias.tecnm.mx',
      password: 'L0N1jA1wmwT%',
      disabled: false,
      displayName: 'Lic. Raúl Vázquez Tiscareño',
    })

    await auth.setCustomUserClaims(uid, {
      role: 'admin',
    })

    res.status(200).json({
      message: 'User created',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
