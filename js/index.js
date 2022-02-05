// main article and title generation
function displayMain() {
    const main = document.getElementById('main')
  
    const mainTitle = document.createElement('h1')
    mainTitle.className = 'mainTitle'
    mainTitle.tabIndex = '0'
    mainTitle.innerText = 'Nos photographes'
    mainTitle.ariaLabel = 'Nos photographes'
  
    main.append(mainTitle)
  
    const mainArticle = document.createElement('article')
    mainArticle.className = 'gridPhotographersWrapper'
    mainArticle.ariaLabel = 'Contenu principal'
    mainArticle.id = 'gridPhotographersWrapper'
  
    main.append(mainArticle)
  
    const mainArticleDiv = document.createElement('div')
    mainArticleDiv.className = 'gridPhotographers'
    mainArticleDiv.id = 'gridPhotographers'
  
    mainArticle.append(mainArticleDiv)
  }
  // refresh on click a element (logo)
  function refreshIndex() {
    document.location.assign('./index.html')
  }
  //header generation (svg appart)
  function displayHeader() {
    const htmlHeader = document.getElementById('header')
  
    const htmlHeaderLink = document.createElement('a')
    htmlHeaderLink.href = '#gridPhotographersWrapper'
    htmlHeaderLink.className = 'goToContent'
    htmlHeaderLink.ariaLabel = 'Passer au contenu'
    htmlHeaderLink.tabIndex = '0'
    htmlHeaderLink.innerText = 'Passer au contenu'
  
    htmlHeader.append(htmlHeaderLink)
  
    document.getElementById('refresh').setAttribute('onClick', 'refreshIndex()')
    document.getElementById('refresh').tabIndex = '0'
  
    const navTags = document.createElement('nav')
    navTags.className = 'navTag'
    navTags.ariaLabel = 'Tags'
    navTags.tabIndex = '0'
  
    const navLinks1 = document.createElement('a')
    navLinks1.href = './index.html?tag=portrait'
    navLinks1.tabIndex = '0'
    navLinks1.innerText = '#Portrait'
    navLinks1.className = 'portrait'
  
    navTags.append(navLinks1)
  
    const navLinks2 = document.createElement('a')
    navLinks2.href = './index.html?tag=art'
    navLinks2.tabIndex = '0'
    navLinks2.innerText = '#Art'
    navLinks2.className = 'art'
  
    navTags.append(navLinks2)
  
    const navLinks3 = document.createElement('a')
    navLinks3.href = './index.html?tag=fashion'
    navLinks3.tabIndex = '0'
    navLinks3.innerText = '#Fashion'
    navLinks3.className = 'fashion'
  
    navTags.append(navLinks3)
  
    const navLinks4 = document.createElement('a')
    navLinks4.href = './index.html?tag=architecture'
    navLinks4.tabIndex = '0'
    navLinks4.innerText = '#Architecture'
    navLinks4.className = 'architecture'
  
    navTags.append(navLinks4)
  
    const navLinks5 = document.createElement('a')
    navLinks5.href = './index.html?tag=travel'
    navLinks5.tabIndex = '0'
    navLinks5.innerText = '#Travel'
    navLinks5.className = 'travel'
  
    navTags.append(navLinks5)
  
    const navLinks6 = document.createElement('a')
    navLinks6.href = './index.html?tag=sport'
    navLinks6.tabIndex = '0'
    navLinks6.innerText = '#Sport'
    navLinks6.className = 'sport'
  
    navTags.append(navLinks6)
  
    const navLinks7 = document.createElement('a')
    navLinks7.href = './index.html?tag=animals'
    navLinks7.tabIndex = '0'
    navLinks7.innerText = '#Animals'
    navLinks7.className = 'animals'
  
    navTags.append(navLinks7)
  
    const navLinks8 = document.createElement('a')
    navLinks8.href = './index.html?tag=events'
    navLinks8.tabIndex = '0'
    navLinks8.innerText = '#Events'
    navLinks8.className = 'events'
  
    navTags.append(navLinks8)
    htmlHeader.append(navTags)
  
    displayMain()
  }
  // main article content generation
  function displayPhotographer(
    name,
    id,
    city,
    country,
    tags,
    tagline,
    price,
    portrait,
  ) {
    const container = document.createElement('div')
    container.className = 'gridPhotographer'
    container.id = 'gridPhotographerid' + id
  
    document.getElementById('gridPhotographers').append(container)
  
    const link = document.createElement('a')
    link.className = 'gridPhotographerHeader'
    link.href = 'page.html?id=' + id
    link.tabIndex = '-1'
  
    container.append(link)
  
    const imageLink = document.createElement('a')
    imageLink.className = 'gridPhotographerHeaderPicLink'
    imageLink.href = 'page.html?id=' + id
    imageLink.tabIndex = '0'
  
    link.append(imageLink)
  
    const image = document.createElement('img')
    image.className = 'gridPhotographerHeaderPic'
    image.src = './img/PhotographersIDPhotos/' + portrait
    image.tabIndex = '-1'
    image.alt = '' + name
  
    imageLink.append(image)
  
    const title = document.createElement('h2')
    title.className = 'gridPhotographerName gridPhotographerHeaderName' + id
    title.textContent = name
    title.ariaLabel = '' + name
  
    link.append(title)
  
    const article = document.createElement('div')
    article.className = 'gridPhotographerAbout'
    article.tabIndex = '0'
  
    link.append(article)
  
    const location = document.createElement('span')
    location.className = 'gridPhotographerAboutLocation'
    location.textContent = city + ', ' + country
  
    article.append(location)
  
    const quote = document.createElement('span')
    quote.className = 'gridPhotographerAboutDesc'
    quote.textContent = tagline
  
    article.append(quote)
  
    const cost = document.createElement('span')
    cost.className = 'gridPhotographerAboutPrice'
    cost.textContent = price + '€/jour'
  
    article.append(cost)
  
    const tag = document.createElement('div')
    tag.className = 'gridPhotographerTag'
    tag.tabIndex = '0'
    tag.ariaLabel = 'Tags ' + name
  
    for (let i = 0; i < tags.length; i++) {
      const taglinks = document.createElement('a')
      taglinks.className = tags[i]
      taglinks.href = `./index.html?tag=${tags[i]}`
      taglinks.innerHTML = '#' + tags[i]
      taglinks.tabIndex = '-1'
  
      tag.append(taglinks)
    }
  
    container.append(tag)
  }
  
  fetch('./fisheyeData.json')
    .then((data) => data.json())
    .then((result) => {
      const parameter = new URLSearchParams(document.location.search)
      const photographerTag = parameter.get('tag')
  
      for (let i = 0; i < result.photographers.length; i++) {
        if (photographerTag === null) {
          displayPhotographer(
            result.photographers[i].name,
            result.photographers[i].id,
            result.photographers[i].city,
            result.photographers[i].country,
            result.photographers[i].tags,
            result.photographers[i].tagline,
            result.photographers[i].price,
            result.photographers[i].portrait,
          )
        } else {
          let tagList = result.photographers[i].tags
          for (let j = 0; j < tagList.length; j++) {
            if (photographerTag === tagList[j]) {
              displayPhotographer(
                result.photographers[i].name,
                result.photographers[i].id,
                result.photographers[i].city,
                result.photographers[i].country,
                result.photographers[i].tags,
                result.photographers[i].tagline,
                result.photographers[i].price,
                result.photographers[i].portrait,
              )
            }
          }
        }
      }
  
      function tagFilter(tagValue) {
        const targets = document.querySelectorAll(`.${tagValue}`)
  
        for (let i = 0; i < targets.length; i++) {
          targets[i].addEventListener('click', () => {
            document.querySelector('main').innerHTML = ''
  
            let photographers = result.photographers
            photographers = photographers.filter(function (element) {
              for (let i = 0; i < element.tags.length; i++) {
                if (element.tags[i] === tagValue) {
                  return element
                }
              }
            })
  
            for (let i = 0; i < photographers.length; i++) {
              displayPhotographer(
                result.photographers[i].name,
                result.photographers[i].id,
                result.photographers[i].city,
                result.photographers[i].country,
                result.photographers[i].tags,
                result.photographers[i].tagline,
                result.photographers[i].price,
                result.photographers[i].portrait,
              )
            }
  
            tagFilter('portrait')
            tagFilter('events')
            tagFilter('travel')
            tagFilter('animals')
            tagFilter('sport')
            tagFilter('architecture')
            tagFilter('art')
            tagFilter('fashion')
          })
        }
      }
  
      tagFilter('portrait')
      tagFilter('events')
      tagFilter('travel')
      tagFilter('animals')
      tagFilter('sport')
      tagFilter('architecture')
      tagFilter('art')
      tagFilter('fashion')
    })
  