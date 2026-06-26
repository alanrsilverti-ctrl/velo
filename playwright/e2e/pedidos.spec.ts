import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'
import { Navbar } from '../support/components/Navbar'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, OrderDetailsDetails } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLookupLink()

    orderLockupPage = new OrderLockupPage(page)

    await orderLockupPage.validadepageloaded()  
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetailsDetails = {
      number: 'VLO-O73Z0R',
      status: 'APROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Alan Silveira',
        email: 'alanrsilverti@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act  
    
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetailsDetails = {
      number: 'VLO-IQF079',
      status: 'REPROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    // Act  
   
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order: OrderDetailsDetails = {
      number: 'VLO-USYN3T',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Jeisianne Mara',
        email: 'jeisinha@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act  
    
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

 
    await orderLockupPage.searchOrder(order)

    await orderLockupPage.validateOrderNotFound()

  })

  test('deve exibir mensagem quando o código do  pedido está fora do padrão', async ({ page }) => {

    const orderCode = 'XYZ-999-INVALIDO'

    await orderLockupPage.searchOrder(orderCode)

    await orderLockupPage.validateOrderNotFound()

  })



})