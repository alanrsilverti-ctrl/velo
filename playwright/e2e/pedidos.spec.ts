import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consulta um pedido aprovado', async ({ page }) => {

 //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  await page.getByTestId('search-order-id').fill('VLO-O73Z0R')

  //Act
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert

  await expect(page.getByText('VLO-O73Z0R')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-O73Z0R')).toContainText('VLO-O73Z0R');

  //Assert
  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-O73Z0R')).toContainText('APROVADO');
})