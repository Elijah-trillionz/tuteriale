import { test, expect } from '@playwright/test';

// the test
// create a new class
// then test that the class is reflecting in its subject in the index page
let initialValue;

test('displays online classs values on subject cards on the homepage', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');

  // getting the online classes of the first card element
  const onlineClassesElement = await page.$('li .online');
  const elementValue = await onlineClassesElement.textContent();

  // get the digit
  initialValue = +elementValue.split(' ')[0];
  const pattern = /\d+\s+(online)/i;

  expect(elementValue).toMatch(pattern);
});

test('creates a new online class successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/classes/new');

  // select web development as subject
  await page.selectOption('[name="subject"]', '01H7B7DADW4V1C56MDAVXQC81K');

  // select online as class type
  await page.selectOption('[name="type"]', 'online');

  // pick a start date
  await page.fill('[name="startDate"]', '2023-08-10');

  // pick a end date
  await page.fill('[name="endDate"]', '2023-08-24');

  // submit form
  await page.click('[type="submit"]');

  await expect(page).toHaveURL(/subjects\/01H7B7DADW4V1C56MDAVXQC81K/);
});

test('homepage reflects new online class added', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // getting the online classes of the first card element
  const onlineClassesElement = await page.$('li .online');
  const elementValue = await onlineClassesElement.textContent();

  // get the digit
  const finalValue = +elementValue.split(' ')[0];

  expect(initialValue + 1).toBe(finalValue);
});
