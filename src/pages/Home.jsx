import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap';
import CardItem from './Card'

const images = ['https://m.media-amazon.com/images/I/91bwGpRgzkL._AC_SL1500_.jpg',
'https://images.kabum.com.br/produtos/fotos/110161/headset-gamer-razer-kraken-ultimate-chroma-usb-drivers-50mm-rz04-03180100-r3u1_1602677445_g.jpg',
'https://assets2.razerzone.com/images/og-image/razer-blackwidow-v3-mini-hyperspeed-OGimage.jpg']

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/items')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data);
        setIsLoading(false)
      })
  }, []);

  return (
    <div>
      { isLoading ? <p>Carregando</p>
      : 
      <CardGroup>
        {items.map((item, index) => (
          <CardItem
          key={item._id}
          id={item._id}
          name={item.name}
          valor={item.valor}
          image={images[index]}
          />
        ))
      }
      </CardGroup>
      }

    </div>
  )
}


