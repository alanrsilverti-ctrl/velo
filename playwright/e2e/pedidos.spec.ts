import { test, expect } from '@playwright/test'

test('deve consulta um pedido aprovado', async ({ page }) => {

  await page.goto('http://localhost:5173/')

  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
//Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByTestId('search-order-id').fill('VLO-O73Z0R')
  await page.getByTestId('search-order-button').click()


  await expect(page.getByTestId('order-result-id')).toContainText('VLO-O73Z0R')
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})