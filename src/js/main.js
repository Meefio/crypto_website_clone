const bannerBtn = document.querySelector('.banner__btn')
const bannerText = document.querySelector('.banner__text')
const bannerChevron = document.querySelector('.fa-chevron-down')
const navBtn = document.querySelector('.hamburger')
const sideMenu = document.querySelector('.side-menu')
const paypalSmallBanner = document.querySelector('.banner-paypal__text')
const paypalBtn = document.querySelector('.banner-paypal__btn')
const paypalExpanded = document.querySelector('.banner-paypal__expanded')
const paypalBtnIcon = document.querySelector('.banner-paypal__icon')
const stockSelectedLi = document.querySelector('.stock__selected-li')
const stockNav = document.querySelector('.stock__nav')
const stockNavLiBox = document.querySelector('.stock__li-box')
const stockLiItem = document.querySelectorAll('.stock__li-item')
const stockNavArrow = document.querySelector('.stock__arrow')
const API_URL = 'https://api.stockdata.org/v1/data/quote?symbols='
// const API_KEY = '&api_token=JGB3f6aL6tyng2f8KOGq2YK0NdtlzChkP2zkV1ve'
const API_KEY = '&api_token=JHN8EIfr7Emz3wLsQWoOynuNC1yvk1I3HDYqZNHR'


const stockPair = document.querySelectorAll('.stock__pair')
const stockFullName = document.querySelectorAll('.stock__full-name')
const stockPrice = document.querySelectorAll('.stock__price')
const percentChange = document.querySelectorAll('.stock__percent-change')
const stockMin = document.querySelectorAll('.stock__min')
const stockMax = document.querySelectorAll('.stock__max')
const progressBar = document.querySelectorAll('.stock__progress')
const progressArrow = document.querySelectorAll('.stock__progress-arrow')

const bannerShowHide = () => {
	if (bannerBtn.classList.contains('show')) {
		bannerText.textContent = '75% rachunków detalicznych CFD odnotowuje straty...'
		bannerBtn.classList.remove('show')
		bannerChevron.classList.add('rotate')
	} else {
		bannerText.innerHTML =
			'Kontrakty CFD są złożonymi instrumentami i wiążą się z dużym ryzykiem szybkiej utraty środków pieniężnych z powodu dźwigni finansowej. <strong> 75% rachunków inwestorów detalicznych odnotowuje straty pieniężne w wyniku handlu kontraktami CFD u niniejszego dostawcy CFD. </strong> Zastanów się, czy rozumiesz,jak działają kontrakty CFD i czy możesz pozwolić sobie na wysokie ryzyko utraty pieniędzy.'
		bannerBtn.classList.add('show')
		bannerChevron.classList.remove('rotate')
	}
}
window.addEventListener(
	'resize',
	function () {
		if (window.innerWidth > 600) {
			bannerBtn.classList.add('show')
			bannerText.innerHTML =
				'Kontrakty CFD są złożonymi instrumentami i wiążą się z dużym ryzykiem szybkiej utraty środków pieniężnych z powodu dźwigni finansowej. <strong> 75% rachunków inwestorów detalicznych odnotowuje straty pieniężne w wyniku handlu kontraktami CFD u niniejszego dostawcy CFD. </strong> Zastanów się, czy rozumiesz,jak działają kontrakty CFD i czy możesz pozwolić sobie na wysokie ryzyko utraty pieniędzy.'
			bannerChevron.classList.remove('rotate')
		}
	}

	// zresearchować throttling & debouncing
)
const burgerFn = () => {
	navBtn.classList.toggle('is-active')
	sideMenu.classList.toggle('menu-show')
}
const hideBurger = () => {
	navBtn.classList.remove('is-active')
	sideMenu.classList.remove('menu-show')
}
const handlePaypal = () => {
	paypalSmallBanner.classList.toggle('paypal-show')
	paypalExpanded.classList.toggle('paypal-show')
	paypalBtnIcon.classList.toggle('paypal-btn-rotate')
}
const handleMenu = () => {
	stockNavLiBox.classList.toggle('stock__nav-show')
	if (stockNavLiBox.classList.contains('stock__nav-show')) {
		stockNavArrow.style.rotate = '180deg'
		stockNavArrow.style.marginTop = '-14px'
	} else {
		stockNavArrow.style.rotate = '0deg'
		stockNavArrow.style.marginTop = '-5px'
	}
}

const hideMenu = () => {
	stockNavLiBox.classList.remove('stock__nav-show')
	stockNavArrow.style.rotate = '0deg'
	stockNavArrow.style.marginTop = '-5px'
}

stockLiItem.forEach(el =>
	el.addEventListener('click', function (e) {
		stockSelectedLi.textContent = e.target.textContent
		clearClass()
		switch (stockSelectedLi.textContent) {
			case 'Najpopularniejsze':
				e.target.classList.add('stock__active')
				return getStockData('AAPL,TSLA,MSFT')
			case 'Forex':
				e.target.classList.add('stock__active')
				return getStockData('AAT,ABC,ACA')
			case 'Akcje':
				el.classList.add('stock__active')
				return getStockData('AVK,AWI,AWF')
			case 'Towary':
				el.classList.add('stock__active')
				return getStockData('ZLDSF,ZMDC,ZNRG')
			case 'Indeksy':
				el.classList.add('stock__active')
				return getStockData('GOOGL,GE,KO')
			case 'Kryptowaluty':
				el.classList.add('stock__active')
				return getStockData('RIOT,COIN,ARGO')
			default:
				console.log('gówno')
				return getStockData('AAPL,TSLA,MSFT')
		}
	})
)

const clearClass = () => {
	stockLiItem.forEach(el => el.classList.remove('stock__active'))
}

const getStockData = symbols => {
	const url = API_URL + symbols + API_KEY
	console.log(symbols)
	console.log(url)
	return axios.get(url).then(res => {
		const symbolData = res.data.data
		stockPair.forEach((elem, index) => {
			elem.textContent = symbolData[index].ticker
		})
		stockFullName.forEach((elem, index) => {
			elem.textContent = symbolData[index].name
		})
		stockPrice.forEach((elem, index) => {
			elem.textContent = symbolData[index].price
		})
		percentChange.forEach((elem, index) => {
			const percent = symbolData[index].day_change / symbolData[index].day_low
			elem.textContent = (percent * 100).toFixed(2) + '%'
		})
		stockMin.forEach((elem, index) => {
			elem.textContent = symbolData[index].day_low
		})
		stockMax.forEach((elem, index) => {
			elem.textContent = symbolData[index].day_high
		})
		progressBar.forEach((elem, index) => {
			const percentChange = Math.floor(
				((symbolData[index].price - symbolData[index].day_low) /
					(symbolData[index].day_high - symbolData[index].day_low)) *
					100
			)
			elem.style.width = percentChange + '%'
		})
		progressArrow.forEach((elem, index) => {
			const percentChange = Math.floor(
				((symbolData[index].price - symbolData[index].day_low) /
					(symbolData[index].day_high - symbolData[index].day_low)) *
					100
			)
			elem.style.left = percentChange + '%'
		})
	})
}

const onClickOutside = (ele, cb) => {
	document.addEventListener('click', event => {
		if (!ele.contains(event.target)) cb()
	})
}

navBtn.addEventListener('click', burgerFn)
bannerBtn.addEventListener('click', bannerShowHide)
paypalBtn.addEventListener('click', handlePaypal)
paypalSmallBanner.addEventListener('click', handlePaypal)
stockNav.addEventListener('click', handleMenu)
onClickOutside(stockNav, hideMenu)
onClickOutside(navBtn, hideBurger)
getStockData('AAPL,TSLA,MSFT')
