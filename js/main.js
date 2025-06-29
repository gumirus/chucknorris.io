const text = document.querySelector('.text')
const avatar = document.querySelector('.avatar')
const categoryTags = document.querySelector('.category-tags')
const jokeId = document.querySelector('.id')
const jokeDate = document.querySelector('.date')
const newQuoteBtn = document.querySelector('.new-quote-btn')

const api_url = 'https://api.chucknorris.io/jokes/random'

async function getQuote(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    // console.log(data)

    // Обновление данных на странице
    text.textContent = data.value
    avatar.src =
      data.icon_url || 'https://api.chucknorris.io/img/avatar/chuck-norris.png'

    // Обновление категорий
    categoryTags.innerHTML = ''
    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((category) => {
        const tag = document.createElement('span')
        tag.className = 'category-tag'
        tag.textContent = category
        categoryTags.appendChild(tag)
      })
    }

    // Обновление метаданных
    jokeId.textContent = `ID: ${data.id}`

    const updatedDate = new Date(data.updated_at)
    jokeDate.textContent = `Updated: ${updatedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`
  } catch (error) {
    console.error('Error fetching quote:', error)
    text.textContent =
      'Failed to load joke. Chuck Norris roundhouse-kicked our server!'
    text.style.color = '#e74c3c'
  }
}

// Загрузка новой цитаты
newQuoteBtn.addEventListener('click', () => {
  getQuote(api_url)
})

// Первоначальная загрузка
getQuote(api_url)
