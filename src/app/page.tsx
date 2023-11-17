'use client'

import Image from 'next/image'
import React,{ useEffect, useRef, useState } from 'react'
import './page.css'
import { sumar, restar, multiplicar, dividir, modulo } from './apiconnect'

export default function Calaculadora() {

  const [numeroMem, setNumeroMem] = useState(0)
  const [pantalla, setPantalla] = useState("0")
  const [proximaOp, setProximaOp] = useState("")
  const [forzarAct, setForzarAct] = useState(false)
  const inputPantalla = useRef<HTMLInputElement>(null);

  const ajustarFuente = () => {
    const lonPantalla = pantalla.length;
    const tamIni = 5;
    const tamMin = 2;
    const lonMax1 = 7;
    const lonMax2 = 19;
    let nTam = tamIni;
    
    if(lonPantalla > lonMax1){
      let charExceso = (lonPantalla - lonMax1) + 2
      nTam = tamIni - ((charExceso)/(lonMax2 - lonMax1))*3      
      nTam = Math.max(nTam, tamMin);      
    }
    inputPantalla.current!.style.fontSize = nTam + 'rem';
  }

  useEffect(() => {
    ajustarFuente()
  }, [pantalla])

  const clickNumero = (numero:string) => {
    let nuevaPantalla = pantalla + numero
    if(pantalla === "0" || forzarAct){
      setForzarAct(false);
      nuevaPantalla = numero
    }
    setPantalla(nuevaPantalla)
  }

  const clickPunto = () => {
    let nuevaPantalla = pantalla + "."
    if(forzarAct){
      nuevaPantalla = "0."
    }
    if(!pantalla.includes(".")){
      setPantalla(nuevaPantalla)
    }
  }

  const clickOperacion = (operacion: string) => {
    setProximaOp(operacion)
    setNumeroMem(parseFloat(pantalla))
    setPantalla("0")  
  }

  const clickIgual = async () => {
    const numActual = parseFloat(pantalla);
    let res:number = numActual;
    switch (proximaOp) {
      case "SUMA":
        res = await sumar(numeroMem,numActual)        
        break;
      case "RESTA":
        res = await restar(numeroMem,numActual)       
        break;
      case "MULTIPLICACION":
        res = await multiplicar(numeroMem,numActual)        
        break;
      case "DIVISION":
        res = await dividir(numeroMem,numActual)        
        break;
      case "MODULO":
        res = await modulo(numeroMem,numActual)
        break;
      default:
        break;
    }
    if(proximaOp !== ""){
      setPantalla(res.toString())
      setForzarAct(true);
      setProximaOp("")
    }
    
  }

  return (
    <main>
      <div className='cont-general'>
        <div className='pantalla'>
          <input type='text' ref={inputPantalla} value={pantalla} readOnly />
        </div>
        <div className='cont-botones'>
          <div className='numeros'>
            
            <button  onClick={() => clickNumero('7')}>7</button>
            <button  onClick={() => clickNumero('8')}>8</button>
            <button  onClick={() => clickNumero('9')}>9</button>
            <button  onClick={() => clickNumero('4')}>4</button>
            <button  onClick={() => clickNumero('5')}>5</button>
            <button  onClick={() => clickNumero('6')}>6</button>
            <button  onClick={() => clickNumero('1')}>1</button>
            <button  onClick={() => clickNumero('2')}>2</button>
            <button  onClick={() => clickNumero('3')}>3</button>
            <button className='doble' onClick={() => clickNumero('0')}>0</button>
            <button onClick={() => clickPunto()}>.</button>
          </div>
          <div className='operaciones'>
            <button onClick={() => clickOperacion("SUMA") }>+</button>
            <button onClick={() => clickOperacion("RESTA") }>-</button>
            <button onClick={() => clickOperacion("MULTIPLICACION") }>*</button>
            <button onClick={() => clickOperacion("DIVISION") }>/</button>
            <button className='mod' onClick={() => clickOperacion("MODULO") }>mod</button>
            <button className='igual' onClick={() => clickIgual() }>=</button>
          </div>
        </div>
      </div>
    </main>
  )
}
