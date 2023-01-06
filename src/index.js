const fs = require('fs')
const express = require('express')
const app = express()
const heroes = JSON.parse(fs.readFileSync('./data/data.json'))
app.use(express.json()) //Para ter acesso ao body

// Get padrão
let getAcess = (request, response) => {
  response.send(`Welcome to the Hero Collectibles Store!`)
}

app.get('/', getAcess)

// Get retornando o conteúdo
let getAll = (request, response) => {
  response.status(200).json({
    data: {
      results: heroes.length,
      heroes
    }
  })
}

app.get('/heroes', getAll)

//Get específico
let getHero = (request, response) => {
  const heroId = request.params.id * 1
  const heroFound = heroes.find(el => el.id === heroId)

  if (!heroFound) {
    response.status(404).send('Hero Not Found!, Please type another Id')
  } else {
    response.status(302).json({
      message: "´This is the Collectible that you're looking for!´",
      data: {
        heroes: heroFound
      }
    })
  }
}

app.get('/heroes/:id', getHero)

// Post
let createHero = (request, response) => {
  const newId = heroes[heroes.length - 1].id + 1
  const newHero = Object.assign({ id: newId }, request.body)

  heroes.push(newHero)
  fs.writeFile('./data/data.json', JSON.stringify(heroes), err => {
    if (err) console.log(err)

    response.status(201).json({
      message: 'Successfull Insert of a new Collectible!',
      data: {
        heroes: newHero
      }
    })
  })
}

app.post('/heroes/insertHero', createHero)

// Patch
let updateHero = (request, response) => {
  const heroId = request.params.id * 1 //id da URL
  const newHero = Object.assign({ id: heroId }, request.body) //Objeto passado no PostMan
  const indexOfHero = heroes.findIndex(el => el.id === heroId)
  const heroFound = heroes.find(el => el.id === heroId) // para futuro uso do boolean retornado

  if (!heroFound) response.status(404).send('Collectible Not Found!')
  else {
    heroes[indexOfHero] = newHero //Atribuição do objeto do postman para o objeto com o index semelhante!

    fs.writeFile('./data/data.json', JSON.stringify(heroes), err => {
      if (err) console.log(err)

      response.status(200).json({
        message: 'Collectible Updated!',
        data: {
          heroes: newHero
        }
      })
    })
  }
}

app.patch('/heroes/updateHero/:id', updateHero)

//Delete
let deleteHero = (request, response) => {
  const heroId = request.params.id * 1
  const indexOfHero = heroes.findIndex(el => el.id === heroId)
  const heroFound = heroes.find(el => el.id === heroId)

  if (!heroFound) response.status(404).send('Collectible Not Found')
  else {
    let arrayHero = heroes.splice(indexOfHero, 1)

    fs.writeFile('./data/data.json', JSON.stringify(heroes), err => {
      response.status(200).json({
        message: `Done!, this is what has been  deleted`,
        data: arrayHero
      })
    })
  }
}

app.delete('/heroes/deleteHero/:id', deleteHero)

// Server
app.listen(3000, (request, response) =>
  console.log('Server running on port 3000!')
)
