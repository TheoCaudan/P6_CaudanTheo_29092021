let tabTri = []
let tabIndex = []
let priceA = ''

function keyboardNavigation() {
  document.addEventListener('keyup', event =>{
    if('ArrowLeft' === event.key){
      document.getElementById('prevPic').click();
    } else if('ArrowRight' === event.key){
      document.getElementById('nextPic').click();
    }
  })
}

const handleHeartClick = (id, btn_id) =>{
  const el = document.getElementById(id), btn = document.getElementById(btn_id), total = document.querySelector('.totalLikes')
  el.onclick = () =>{
    if(el.classList.contains('far')){
      btn.innerHTML = parseInt(btn.innerHTML) + 1
      total.innerHTML = parseInt(total.innerHTML) + 1
      el.classList.replace('far', 'fas')
    } else{
      btn.innerHTML = parseInt(btn.innerHTML) - 1
      total.innerHTML = parseInt(total.innerHTML) - 1
      el.classList.replace('fas', 'far')
    }
  }
}

function toggleHeart() {
  for(let i = 0; i < tabTri.length; i++){
    handleHeartClick(
      'photographerPicturesLikes' + tabTri[i].id,
      'photographerPicturesNbrLikes' + tabTri[i].id,
    )
  }
  handleHeartClick('lightboxContentMediaLikes', 'lightboxContentMediaLikesNbr')
} 

function sortingByDate() {
  return [].slice.call(tabTri).sort(function (a, b) {
    let au = new Date(a.date)
    let bu = new Date(b.date)
    return bu - au
  })
}

function sortingByTitle() {
  return [].slice.call(tabTri).sort(function (a, b) {
    let au = a.title.toUpperCase()
    let bu = b.title.toUpperCase()
    if (au < bu) return -1
    if (au > bu) return 1
    return 0
  })
}

function sortingByPopularity() {
  return [].slice.call(tabTri).sort(function (a, b) {
    let au = a.likes
    let bu = b.likes
    return bu - au
  })
}
//remove pictures, call sortingByPopularity, display pictures, reset tabIndex
function sortingA() {
  document.querySelector('.photographerPictures').innerHTML = ''
  tabIndex = []
  displayPictures(sortingByPopularity(tabTri))
}
//remove pictures, call sortingByDate, display pictures, reset tabIndex
function sortingB() {
  document.querySelector('.photographerPictures').innerHTML = ''
  tabIndex = []
  displayPictures(sortingByDate(tabTri))
}
//remove pictures, call sortingByTitle, display pictures, reset tabIndex
function sortingC() {
  document.querySelector('.photographerPictures').innerHTML = ''
  tabIndex = []
  displayPictures(sortingByTitle(tabTri))
}
//display pictures once displayProfile is done generating the header and the info section
function displayPictures(tabTri) {
  const picturesContainer = document.getElementById('photographerPictures')
  for (let i = 0; i < tabTri.length; i++) {
    const picturesContainerAll = document.createElement('div')
    picturesContainerAll.className = 'photographerPicturesCard'
    const picturesContainerLink = document.createElement('a')
    picturesContainerLink.className = 'photographerPicturesLink'
    picturesContainerLink.setAttribute('data-id', tabTri[i].id)
    picturesContainerLink.id = 'photographerPicturesLink' + i

    picturesContainerLink.onclick = () => {
      const lightbox = document.querySelector('.lightbox')
      const lightboxContent = document.querySelector('#lightboxContent')
      lightbox.querySelector('.prevPic').onclick = () => {
        let id = lightbox.dataset.id,
          ids = lightbox.dataset.ids.split(','),
          new_id = ids[ids.indexOf(id) - 1]

        lightbox.dataset.id = new_id
        let info = tabTri.find((photo) => photo.id == new_id)

        if (info.image) {
          const lightboxContentMedia = document.getElementById(
            'lightboxContentMedia',
          )
          const lightboxContentMediaNew = document.createElement('img')
          lightboxContentMediaNew.id += 'lightboxContentMedia'
          lightboxContentMediaNew.src = `./img/${info.photographerId}/${info.image}`
          lightboxContent.replaceChild(
            lightboxContentMediaNew,
            lightboxContentMedia,
          )
          const lightboxContentTitle = document.getElementById(
            'lightboxContentMediaTitle',
          )
          lightboxContentTitle.innerHTML = '' + info.title
          lightboxContentTitle.ariaLabel = '' + info.title
          const lightboxContentMediaLikes = document.getElementById(
            'lightboxContentMediaLikesNbr',
          )
          lightboxContentMediaLikes.innerHTML = '' + info.likes

        } else {
          const lightboxContentMedia = document.getElementById(
            'lightboxContentMedia',
          )
          const lightboxContentMediaNew = document.createElement('video')
          lightboxContentMediaNew.id += 'lightboxContentMedia'
          lightboxContentMediaNew.controls = true
          lightboxContent.replaceChild(
            lightboxContentMediaNew,
            lightboxContentMedia,
          )
          const lightboxContentMediaSrc = document.createElement('source')
          lightboxContentMediaSrc.src = `./img/${info.photographerId}/${info.video}`
          lightboxContentMediaSrc.type = 'video/mp4'
          lightboxContentMediaNew.append(lightboxContentMediaSrc)
          const lightboxContentTitle = document.getElementById(
            'lightboxContentMediaTitle',
          )
          lightboxContentTitle.innerHTML = '' + info.title
          const lightboxContentMediaLikes = document.getElementById(
            'lightboxContentMediaLikesNbr',
          )
          lightboxContentMediaLikes.innerHTML = '' + info.likes
        }
      }

      lightbox.querySelector('.nextPic').onclick = () => {
        let id = lightbox.dataset.id,
          ids = lightbox.dataset.ids.split(','),
          new_id = ids[ids.indexOf(id) + 1]

        lightbox.dataset.id = new_id
        let info = tabTri.find((photo) => photo.id == new_id)

        if (info.image) {
          const lightboxContentMedia = document.getElementById(
            'lightboxContentMedia',
          )
          const lightboxContentMediaNew = document.createElement('img')
          lightboxContentMediaNew.id += 'lightboxContentMedia'
          lightboxContentMediaNew.src = `./img/${info.photographerId}/${info.image}`
          lightboxContent.replaceChild(
            lightboxContentMediaNew,
            lightboxContentMedia,
          )
          const lightboxContentTitle = document.getElementById(
            'lightboxContentMediaTitle',
          )
          lightboxContentTitle.innerHTML = '' + info.title
          const lightboxContentMediaLikes = document.getElementById(
            'lightboxContentMediaLikesNbr',
          )
          lightboxContentMediaLikes.innerHTML = '' + info.likes

        } else {
          const lightboxContentMedia = document.getElementById(
            'lightboxContentMedia',
          )
          const lightboxContentMediaNew = document.createElement('video')
          lightboxContentMediaNew.id += 'lightboxContentMedia'
          lightboxContentMediaNew.controls = true
          lightboxContent.replaceChild(
            lightboxContentMediaNew,
            lightboxContentMedia,
          )
          const lightboxContentMediaSrc = document.createElement('source')
          lightboxContentMediaSrc.src = `./img/${info.photographerId}/${info.video}`
          lightboxContentMediaSrc.type = 'video/mp4'
          lightboxContentMediaNew.append(lightboxContentMediaSrc)
          const lightboxContentTitle = document.getElementById(
            'lightboxContentMediaTitle',
          )
          lightboxContentTitle.innerHTML = '' + info.title
          const lightboxContentMediaLikes = document.getElementById(
            'lightboxContentMediaLikesNbr',
          )
          lightboxContentMediaLikes.innerHTML = '' + info.likes

        }
      }
      if (tabTri[i].image) {
        const lightboxContentMedia = document.getElementById(
          'lightboxContentMedia',
        )
        const lightboxContentMediaNew = document.createElement('img')
        lightboxContentMediaNew.id += 'lightboxContentMedia'
        lightboxContentMediaNew.src =
          './img/' + tabTri[i].photographerId + '/' + tabTri[i].image
        lightboxContent.replaceChild(
          lightboxContentMediaNew,
          lightboxContentMedia,
        )
        const lightboxContentTitle = document.getElementById(
          'lightboxContentMediaTitle',
        )
        lightboxContentTitle.innerHTML = '' + tabTri[i].title
        const lightboxContentMediaLikes = document.getElementById(
          'lightboxContentMediaLikesNbr',
        )
        lightboxContentMediaLikes.innerHTML = '' + tabTri[i].likes

      } else {
        const lightboxContentMedia = document.getElementById(
          'lightboxContentMedia',
        )
        const lightboxContentMediaNew = document.createElement('video')
        lightboxContentMediaNew.id += 'lightboxContentMedia'
        lightboxContentMediaNew.controls = true
        lightboxContent.replaceChild(
          lightboxContentMediaNew,
          lightboxContentMedia,
        )
        const lightboxContentMediaSrc = document.createElement('source')
        lightboxContentMediaSrc.src = `./img/${tabTri[i].photographerId}/${tabTri[i].video}`
        lightboxContentMediaSrc.type = 'video/mp4'
        lightboxContentMediaNew.append(lightboxContentMediaSrc)
        const lightboxContentTitle = document.getElementById(
          'lightboxContentMediaTitle',
        )
        lightboxContentTitle.innerHTML = '' + tabTri[i].title
        const lightboxContentMediaLikes = document.getElementById(
          'lightboxContentMediaLikesNbr',
        )
        lightboxContentMediaLikes.innerHTML = '' + tabTri[i].likes

      }
      lightbox.style.display = 'block'
      lightbox.dataset.id = tabTri[i].id
    }

    tabIndex.push(tabTri[i].id)

    picturesContainer.append(picturesContainerAll)
    picturesContainerAll.append(picturesContainerLink)

    if (tabTri[i].image) {
      const pictures = document.createElement('img')
      pictures.className =
        'photographerPicturesImg photographerPicturesImg' + tabTri[i].id
      pictures.src = './img/' + tabTri[i].photographerId + '/' + tabTri[i].image
      pictures.tabIndex = 0
      pictures.ariaLabel = '' + tabTri[i].title

      const picTitle = document.createElement('h3')
      picTitle.className = 'photographerPicturesTitle'
      picTitle.id = 'photographerPicturesTitle' + tabTri[i].id
      picTitle.innerHTML = '' + tabTri[i].title

      const picNumberLikes = document.createElement('h4')
      picNumberLikes.className = 'photographerPicturesNbrLikes'
      picNumberLikes.id = 'photographerPicturesNbrLikes' + tabTri[i].id
      picNumberLikes.innerHTML = '' + tabTri[i].likes

      const picLikes = document.createElement('i')
      picLikes.className = 'photographerPicturesLikes far fa-heart'
      picLikes.id = 'photographerPicturesLikes' + tabTri[i].id
      picLikes.tabIndex = -1  

      picturesContainerLink.append(pictures)
      picturesContainerAll.append(picTitle)
      picturesContainerAll.append(picNumberLikes)
      picturesContainerAll.append(picLikes)
    } else {
      const videos = document.createElement('video')
      videos.className =
        'photographerPicturesImg photographerPicturesImg' + tabTri[i].id
      videos.setAttribute('preload', 'auto')
      videos.tabIndex = 0 
      videos.ariaLabel = '' + tabTri[i].title 

      const videoSource = document.createElement('source')
      videoSource.src =
        './img/' + tabTri[i].photographerId + '/' + tabTri[i].video + '#t=0.5'
      videoSource.type = 'video/mp4'

      videos.append(videoSource)

      const picTitle = document.createElement('h3')
      picTitle.className = 'photographerPicturesTitle'
      picTitle.id = 'photographerPicturesTitle' + tabTri[i].id
      picTitle.innerHTML = '' + tabTri[i].title

      const picNumberLikes = document.createElement('h4')
      picNumberLikes.className = 'photographerPicturesNbrLikes'
      picNumberLikes.id = 'photographerPicturesNbrLikes' + tabTri[i].id
      picNumberLikes.innerHTML = '' + tabTri[i].likes

      const picLikes = document.createElement('i')
      picLikes.className = 'photographerPicturesLikes far fa-heart'
      picLikes.id = 'photographerPicturesLikes' + tabTri[i].id

      picturesContainerLink.append(videos)
      picturesContainerAll.append(picTitle)
      picturesContainerAll.append(picNumberLikes)
      picturesContainerAll.append(picLikes)
    }
  }
  document.querySelector('main').append(picturesContainer)
}


const createLightBox = () => {
  const lightbox = document.createElement('div')
  lightbox.dataset.ids = tabIndex.join(',')
  lightbox.className = 'lightbox'
  lightbox.style.display = 'none'
  document.body.appendChild(lightbox)

  const lightboxCloser = document.createElement('span')
  lightboxCloser.onclick = () => {
    lightbox.style.display = 'none'
  }
  lightboxCloser.className = 'lightboxCloser fas fa-times'
  lightboxCloser.ariaLabel = 'Fermer la visionneuse'
  lightbox.append(lightboxCloser)

  const lightboxNext = document.createElement('i')
  lightboxNext.className = 'nextPic fas fa-chevron-right'
  lightboxNext.ariaLabel = 'Image suivante'
  lightboxNext.id = 'nextPic'
  lightbox.append(lightboxNext)

  const lightboxPrev = document.createElement('i')
  lightboxPrev.className = 'prevPic fas fa-chevron-left'
  lightboxPrev.ariaLabel = 'Image precedente'
  lightboxPrev.id = 'prevPic'
  lightbox.append(lightboxPrev)

  const lightboxContent = document.createElement('div')
  lightboxContent.id = 'lightboxContent'
  lightbox.append(lightboxContent)

  const lightboxContentMedia = document.createElement('img')
  lightboxContentMedia.id = 'lightboxContentMedia'
  lightboxContent.append(lightboxContentMedia)

  const lightboxContentMediaTitle = document.createElement('h3')
  lightboxContentMediaTitle.id = 'lightboxContentMediaTitle'
  lightboxContent.append(lightboxContentMediaTitle)

  const lightboxContentMediaNumberLikes = document.createElement('h4')
  lightboxContentMediaNumberLikes.id = 'lightboxContentMediaLikesNbr'
  lightboxContent.append(lightboxContentMediaNumberLikes)

  const lightboxContentMediaLikes = document.createElement('i')
  lightboxContentMediaLikes.className = 'lightboxLikes far fa-heart'
  lightboxContentMediaLikes.id = 'lightboxContentMediaLikes'
  lightboxContent.append(lightboxContentMediaLikes)
}

function displayLikes() {
  let totalLikes = 0
  for (let i = 0; i < tabTri.length; i++) {
    totalLikes += tabTri[i].likes
  }
  let photographerPrice = priceA.toString()
  const display = document.createElement('div')
  display.className = 'display'
  const likes = document.createElement('p')
  likes.textContent = totalLikes + ' '
  likes.className = 'fas fa-heart totalLikes'
  const price = document.createElement('p')
  price.className = 'photographerPrice'
  price.textContent = photographerPrice + '€/jour'
  display.append(likes)
  display.append(price)
  document.querySelector('footer').append(display)
}
//gotohomepage function
function home() {
  document.location.assign('./index.html')
}
function displayProfile(name, id, city, country, tagline, tags, portrait) {
  // logo link to homepage
  document.getElementById('goToHomepage').setAttribute('onClick', 'home()')
  document.getElementById('goToHomepage').tabIndex = '0'
  document.getElementById('goToHomepage').ariaLabel = 'Retour vers menu'
  //tab title
  const title = document.getElementById('title')
  title.innerText = 'FishEye - ' + name

  //main container
  const photographer = document.createElement('nav')
  photographer.className = 'photographer'

  //photographer about section
  const about = document.createElement('div')
  about.className = 'photographerAbout'

  photographer.append(about)

  const aboutName = document.createElement('h1')
  aboutName.className = 'photographerAboutName'
  aboutName.id = 'photographerAboutName' + id
  aboutName.textContent = name
  aboutName.tabIndex = '0'

  about.append(aboutName)

  const aboutLocation = document.createElement('span')
  aboutLocation.className = 'photographerAboutLocation'
  aboutLocation.textContent = city + ', ' + country
  aboutLocation.tabIndex = '0'

  about.append(aboutLocation)

  const aboutQuote = document.createElement('span')
  aboutQuote.className = 'photographerAboutQuote'
  aboutQuote.innerHTML = '' + tagline
  aboutQuote.tabIndex = '0'

  about.append(aboutQuote)

  const aboutTags = document.createElement('span')
  aboutTags.className = 'photographerAboutTags'

  about.append(aboutTags)

  for (let i = 0; i < tags.length; i++) {
    const aboutTaglinks = document.createElement('a')
    aboutTaglinks.className = tags[i]
    aboutTaglinks.href = `.page.html?tag=${tags[i]}`
    aboutTaglinks.textContent = '#' + tags[i]

    aboutTags.append(aboutTaglinks)
  }

  //photographer contact button
  const contact = document.createElement('div')
  contact.className = 'photographerContact'

  photographer.append(contact)

  const contactBtn = document.createElement('button')
  contactBtn.className = 'photographerContactBtn'
  contactBtn.innerText = 'Contactez moi'
  contactBtn.tabIndex = '0'
  contactBtn.ariaLabel = 'Contactez moi'  

  contact.append(contactBtn)

  //photographer pic section
  const pic = document.createElement('div')
  pic.className = 'photographerPic'

  photographer.append(pic)

  const picImg = document.createElement('img')
  picImg.className = 'photographerPicImg'
  picImg.src = './img/PhotographersIDPhotos/' + portrait
  picImg.alt = ''
  picImg.tabIndex = '0'
  picImg.ariaLabel = '' + name

  pic.append(picImg)

  document.querySelector('main').append(photographer)

  //photographer sorting section
  const sorting = document.createElement('div')
  sorting.className = 'sorting'

  const sortingTxt = document.createElement('p')
  sortingTxt.className = 'sortingText'
  sortingTxt.innerText = 'Trier par'

  sorting.append(sortingTxt)

  document.querySelector('main').append(sorting)

  //photographer sorting section scrolling button
  const scroll = document.createElement('select')
  scroll.className = 'scrollingMenu'
  scroll.tabIndex = '0'
  scroll.ariaLabel = 'Order By'
  scroll.name = 'option'
  scroll.id = 'optionSelect'
  scroll.innerHTML =
    '<option type="radio" value="popularity" name="option" aria-label="Popularité">Popularité</option>'
  scroll.innerHTML +=
    '<option type="radio" value="date" name="option" aria-label="Date">Date</option>'
  scroll.innerHTML +=
    '<option type="radio" value="title" name="option" aria-label="Titre">Titre</option>'

  document.querySelector('main').append(scroll)

  //photographer pic grid where to display pictures
  const picGrid = document.createElement('div')
  picGrid.className = 'photographerPictures'
  picGrid.id = 'photographerPictures'
  picGrid.tabIndex = -1

  document.querySelector('main').append(picGrid)

  //photographer contact modal
  const modalbg = document.createElement('div')
  modalbg.className = 'photographerContactModal'

  //launch modal
  const modalBtn = document.querySelector('.photographerContactBtn')
  modalBtn.addEventListener('click', launchModal)

  function launchModal() {
    modalbg.style.display = 'block'
  }

  const modalContent = document.createElement('div')
  modalContent.className = 'photographerContactModalContent'

  modalbg.append(modalContent)

  const modalTitle = document.createElement('h1')
  modalTitle.className = 'photographerContactModalContentTitle'
  modalTitle.innerText = 'Contactez-moi ' + name

  modalContent.append(modalTitle)

  //close modal
  const modalClose = document.createElement('span')
  modalClose.className = 'photographerContactModalContentClose'
  modalClose.addEventListener('click', closeModal)

  modalContent.append(modalClose)

  function closeModal() {
    modalbg.style.display = 'none'
  }

  //modal itself
  const modalBody = document.createElement('div')
  modalBody.className = 'photographerContactModalContentBody'

  modalContent.append(modalBody)

  const modalForm = document.createElement('form')
  modalForm.name = ''
  modalForm.id = ''
  modalForm.setAttribute('action', './page.html')
  modalForm.setAttribute('method', 'GET')

  modalBody.append(modalForm)

  const modalFormData = document.createElement('div')
  modalFormData.className = 'formData'

  modalForm.append(modalFormData)

  const modalFormDataFirstnameLabel = document.createElement('label')
  modalFormDataFirstnameLabel.className = 'formLabel'
  modalFormDataFirstnameLabel.setAttribute('for', 'firstname')
  modalFormDataFirstnameLabel.innerText = 'Prénom'
  modalFormDataFirstnameLabel.ariaLabel = ' Prénom'

  modalFormData.append(modalFormDataFirstnameLabel)

  const returnCarriage = document.createElement('br')

  modalFormData.append(returnCarriage)

  const modalFormDataFirstnameInput = document.createElement('input')
  modalFormDataFirstnameInput.className = 'textControl textControlFirstname'
  modalFormDataFirstnameInput.type = 'text'
  modalFormDataFirstnameInput.id = 'firstname'
  modalFormDataFirstnameInput.name = 'firstname'

  modalFormData.append(modalFormDataFirstnameInput)

  const returnCarriage2 = document.createElement('br')

  modalFormData.append(returnCarriage2)

  const modalFormDataFirstnameError = document.createElement('span')
  modalFormDataFirstnameError.className = 'firstnameIsNotValid error'

  modalFormData.append(modalFormDataFirstnameError)

  const returnCarriage3 = document.createElement('br')

  modalFormData.append(returnCarriage3)

  const modalFormData2 = document.createElement('div')
  modalFormData2.className = 'formData'

  modalForm.append(modalFormData2)

  const modalFormDataLastnameLabel = document.createElement('label')
  modalFormDataLastnameLabel.className = 'formLabel'
  modalFormDataLastnameLabel.setAttribute('for', 'lastname')
  modalFormDataLastnameLabel.innerText = 'Nom'
  modalFormDataLastnameLabel.ariaLabel = 'Nom'

  modalFormData2.append(modalFormDataLastnameLabel)

  const returnCarriage4 = document.createElement('br')

  modalFormData2.append(returnCarriage4)

  const modalFormDataLastnameInput = document.createElement('input')
  modalFormDataLastnameInput.className = 'textControl textControlLastname'
  modalFormDataLastnameInput.type = 'text'
  modalFormDataLastnameInput.id = 'lastname'
  modalFormDataLastnameInput.name = 'lastname'

  modalFormData2.append(modalFormDataLastnameInput)

  const returnCarriage5 = document.createElement('br')

  modalFormData2.append(returnCarriage5)

  const modalFormDataLastnameError = document.createElement('span')
  modalFormDataLastnameError.className = 'lastnameIsNotValid error'

  modalFormData2.append(modalFormDataLastnameError)

  const returnCarriage6 = document.createElement('br')

  modalFormData2.append(returnCarriage6)

  const modalFormData3 = document.createElement('div')
  modalFormData3.className = 'formData'

  modalForm.append(modalFormData3)

  const modalFormDataEmailLabel = document.createElement('label')
  modalFormDataEmailLabel.className = 'formLabel'
  modalFormDataEmailLabel.setAttribute('for', 'email')
  modalFormDataEmailLabel.innerText = 'Adresse email'

  modalFormData3.append(modalFormDataEmailLabel)

  const returnCarriage7 = document.createElement('br')

  modalFormData3.append(returnCarriage7)

  const modalFormDataEmailInput = document.createElement('input')
  modalFormDataEmailInput.className = 'textControl textControlEmail'
  modalFormDataEmailInput.type = 'email'
  modalFormDataEmailInput.id = 'email'
  modalFormDataEmailInput.name = 'email'

  modalFormData3.append(modalFormDataEmailInput)

  const returnCarriage8 = document.createElement('br')

  modalFormData3.append(returnCarriage8)

  const modalFormDataEmailError = document.createElement('span')
  modalFormDataEmailError.className = 'emailIsNotValid error'

  modalFormData3.append(modalFormDataEmailError)

  const returnCarriage9 = document.createElement('br')

  modalFormData3.append(returnCarriage9)

  const modalFormData4 = document.createElement('div')
  modalFormData4.className = 'formData'

  modalForm.append(modalFormData4)

  const modalFormDataMessageLabel = document.createElement('label')
  modalFormDataMessageLabel.className = 'formLabel'
  modalFormDataMessageLabel.setAttribute('for', 'message')
  modalFormDataMessageLabel.innerText = 'Message'

  modalFormData4.append(modalFormDataMessageLabel)

  const returnCarriage10 = document.createElement('br')

  modalFormData4.append(returnCarriage10)

  const modalFormDataMessageInput = document.createElement('input')
  modalFormDataMessageInput.className = 'textControl textControlMessage'
  modalFormDataMessageInput.type = 'text'
  modalFormDataMessageInput.id = 'message'
  modalFormDataMessageInput.name = 'message'

  modalFormData4.append(modalFormDataMessageInput)

  const returnCarriage11 = document.createElement('br')

  modalFormData4.append(returnCarriage11)

  const modalFormDataMessageError = document.createElement('span')
  modalFormDataMessageError.className = 'messageIsNotValid error'

  modalFormData4.append(modalFormDataMessageError)

  const returnCarriage12 = document.createElement('br')

  modalFormData4.append(returnCarriage12)

  const modalSubmit = document.createElement('button')
  modalSubmit.className = 'photographerContactModalContentSubmit'
  modalSubmit.innerText = 'Envoyer'

  modalContent.append(modalSubmit)

  document.querySelector('main').append(modalbg)

  //Listening for sorting choice
  const sortingOption = document.querySelector('#optionSelect')
  sortingOption.addEventListener('change', (e) => {
    if (e.target.value === 'popularity') {
      sortingA()
    }
    if (e.target.value === 'date') {
      sortingB()
    }
    if (e.target.value === 'title') {
      sortingC()
    }
  })
}

; (async () => {
  await fetch('./fisheyeData.json')
    .then((data) => data.json())
    .then((result) => {
      const parameter = new URLSearchParams(window.location.search)
      const photographerId = parameter.get('id')
      let photographerData = {}

      const parameter2 = new URLSearchParams(document.location.search)
      photographerData = parameter2.get(
        'id',
        'name',
        'city',
        'country',
        'tagline',
        'tags',
        'portrait',
        'price',
      )

      for (let i = 0; i < result.photographers.length; i++) {
        if (result.photographers[i].id == photographerId) {
          displayProfile(
            result.photographers[i].name,
            result.photographers[i].id,
            result.photographers[i].city,
            result.photographers[i].country,
            result.photographers[i].tagline,
            result.photographers[i].tags,
            result.photographers[i].portrait,
          )
          priceA = result.photographers[i].price
        }
      }

      let mediaData = {}

      const parameter4 = new URLSearchParams(document.location.search)
      mediaData = parameter4.get(
        'id',
        'photographerId',
        'title',
        'image',
        'tags',
        'likes',
        'date',
        'price',
      )
      for (let i = 0; i < result.media.length; i++) {
        if (result.media[i].photographerId == photographerId) {
          mediaData = result.media[i]
          tabTri.push(mediaData)
        }
      }
    })

  displayPictures(sortingByPopularity(tabTri));
  createLightBox();
  displayLikes();
  toggleHeart();
  keyboardNavigation();
})()
