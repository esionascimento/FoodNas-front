import React from 'react'
import { Dispatch } from 'redux'

import { fechtOrderCancelled, fechtOrderConfirmed } from '../../services/FetchFood/merchantOrder'
import Notification from '../notification/index'
import IntervalVerifyConfCancel from './intervalVerifyConfCancel'

import { DivContact, DivButton, DivBody } from './styled'

interface interDataLog {
  items: [],
  customer: { phone: {
    number: unknown;
    localizer: unknown
  }},
  delivery: { deliveryAddress: { streetName: unknown } }
}

interface interMapData {
  name: string, quantity: number, totalPrice: number
}

export function CompPending(dataLog: interDataLog, dataOrderAck: unknown, selectOrderId: string, dispatch: Dispatch<{ type: string, payload: string}>) {
  console.log('dataOrderAck :', dataOrderAck)
  function items() {
    return dataLog.items.map((aux: interMapData, index: number) => {
      return (
        <DivContact key={index}>
          <div>
            <p>{index + 1}</p>
          </div>
          <div>
            <p>{`nome: ${aux.name}`}</p>
            <p>{`quantidade: ${aux.quantity}`}</p>
            <p>{`Valor Total: ${aux.totalPrice}`}</p>
          </div>
        </DivContact>
      )
    })
  }

  async function handleConfirmed() {
    await fechtOrderConfirmed(selectOrderId)
    Notification(false)
    IntervalVerifyConfCancel(selectOrderId, dispatch)
  }

  async function handlerCanceled() {
    fechtOrderCancelled(selectOrderId).then((suces) => {
      console.log('suces :', suces)
    }).catch((err) => {
      console.log('err :', err.response)
      IntervalVerifyConfCancel(selectOrderId, dispatch)
    })
  }

  return (
    <>
      <DivButton>
        <button onClick={handlerCanceled}>Cancelar</button>
        <button onClick={handleConfirmed}>Confirmar</button>
      </DivButton>
      <DivBody>
        <h2>Pedido Pendente</h2>
        <div>
          <h3>Contato</h3>
          <DivContact>
            <p>{`Telefone: ${dataLog && dataLog.customer.phone.number}`}</p>
            <p>{`Localizador: ${dataLog && dataLog.customer.phone.localizer}`}</p>
          </DivContact>
          <h3>Endereço</h3>
          <p>{`Rua: ${dataLog && dataLog.delivery.deliveryAddress.streetName}`}</p>
          <h3>Pedido(s)</h3>
          {dataLog ? items() : ''}
        </div>
      </DivBody>
    </>
  )
}
