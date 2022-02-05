import { DivContact, DivButton, DivBody } from './styled';

export function ComponentPending(dataLog: any) {

  function items() {
    return dataLog.items.map((aux: any, index: any) => {
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

  return (
    <>
      <DivButton>
        <button>Cancelar</button>
        <button>Confirmar</button>
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
