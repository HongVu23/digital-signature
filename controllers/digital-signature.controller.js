const crypto = require('crypto')

// generate key pair
const generateKeyPair = (req, res) => {

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'der'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'der'
        }
    })

    return res.json({ publicKey: publicKey.toString('base64'), privateKey: privateKey.toString('base64') })
}

// sign
const sign = (req, res) => {

    let { privateKey, data } = req.body

    privateKey = crypto.createPrivateKey({
        key: Buffer.from(privateKey, 'base64'),
        type: 'pkcs8',
        format: 'der'
    })

    const sign = crypto.createSign('SHA256')
    sign.update(data)
    sign.end()
    const signature = sign.sign(privateKey).toString('base64')

    return res.json({ data, signature })
}

// verify
const verify = (req, res) => {

    let { data, publicKey, signature } = req.body

    publicKey = crypto.createPublicKey({
        key: Buffer.from(publicKey, 'base64'),
        type: 'spki',
        format: 'der'
    })

    const verify = crypto.createVerify('SHA256')
    verify.update(data)
    verify.end()

    const result = verify.verify(publicKey, Buffer.from(signature, 'base64'))
    return res.json({ verify: result })
}

module.exports = {
    generateKeyPair,
    sign,
    verify
}