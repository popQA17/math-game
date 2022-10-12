import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import RoulettePro from 'react-roulette-pro'
import 'react-roulette-pro/dist/index.css';

const prizes = [
    {
      image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
      number: 1,
    },
    {
      image: 'https://i.ibb.co/T1M05LR/good-2.png',
      number: 2,
    },
    {
      image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
      number: 3,
    },
    {
      image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
      number: 4,
    },
    {
      image: 'https://i.ibb.co/64k8D1c/good-5.png',
      number: 5,
    },
    {
        image: 'https://i.ibb.co/64k8D1c/good-5.png',
        number: 4,
      },
      {
        image: 'https://i.ibb.co/64k8D1c/good-5.png',
        number: 2,
      },
      {
        image: 'https://i.ibb.co/64k8D1c/good-5.png',
        number: 1,
      },
      {
        image: 'https://i.ibb.co/64k8D1c/good-5.png',
        number: 3,
      },

  ];

export default function Wheel(){
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    const reproductionArray = (array = [], length = 0) => [
        ...Array(length)
          .fill('_')
          .map(() => array[Math.floor(Math.random() * array.length)]),
    ];
    const reproducedPrizeList = [
        ...reproductionArray(prizes, prizes.length * 30),
      ];
    const prizeList = reproducedPrizeList.map((prize) => ({
        ...prize,
        id: makeid(),
        key: makeid(),
    }))
    const [start, setStart] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setStart(true)
        }, 1000)
    }, [])
    const prizeIndex = 1 * 30
    return(<>
    <RoulettePro
        prizes={prizeList}
        type={'horizontal'}
        options={{stopInCenter: true}}
        onPrizeDefined={(e)=>{
            console.log(e)
        }}
        spinningTime={3}
        prizeIndex={prizeIndex}
        start={start}
      />
    <Text>{prizeList[prizeIndex].number}</Text>
    </>)
}