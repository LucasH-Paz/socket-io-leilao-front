import React, { useEffect, useState } from 'react'

import { Card, Button } from 'react-bootstrap';

const { io } =require("socket.io-client");
const socket = io('http//localhost:3001');

export default function CardItem( id, name, valor, image) {
  const [currentValue, setCurrentValue] = useState(valor)

  useEffect(() => {
    socket.on('refreshCurrentValue', (data) => {
      if(id === data._id) setCurrentValue(valor)
    })
  }, [])

  const handleClick = (e) => {
    socket.emit('increaseValue', { id })
  }

  return (
    <Card>
      <Card.img variant="top" src={image} />
      <Card.Body>
        <Card.Title><span>{name}</span></Card.Title>
        
        <Card.Text>
          Valor: <span>{currentValue}</span>  
        </Card.Text>
        { currentValue < 100 ?
          <Button onClick={handleClick}>Votar</Button>
          :
          <Button disable={true}>Produto arrematado</Button>
        }
        
      </Card.Body>
    </Card>
  )
}
