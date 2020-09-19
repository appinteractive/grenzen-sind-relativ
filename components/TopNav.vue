<template>
  <nav class="flex items-center justify-between flex-wrap bg-white border border-gray-300 fixed w-full z-50">
    <div class="w-full border-b border-gray-300 p-6 pb-0">
      <div class="container m-auto flex items-baseline">
        <nuxt-link to="/" class="flex">
          <Logo class="flex items-center flex-shrink-0 flex-grow-0 text-white mr-6" />
        </nuxt-link>
        <div class="block lg:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-white hover:border-white"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto items-baseline bottom-0">
          <div class="lg:flex-grow">
            <NavItemLevelOne
              v-for="(nav, index) in navigation"
              :key="nav.url"
              :active="nav.url === navigation[currentMain].url"
              :to="nav.url"
              @click="currentMain = index"
            >
              {{ nav.title }}
            </NavItemLevelOne>
            <!-- <NavItemLevelOne to="/aktuelles">Aktuelles</NavItemLevelOne>
            <NavItemLevelOne to="/ueber-uns">Über uns</NavItemLevelOne>
            <NavItemLevelOne to="/was-wir-tun" :active="true">Was wir tun</NavItemLevelOne>
            <NavItemLevelOne to="/media">Media</NavItemLevelOne>
            <NavItemLevelOne to="/mitmachen">Mitmachen</NavItemLevelOne>
            <NavItemLevelOne to="/kontakt">Kontakt</NavItemLevelOne> -->
            <!-- <a
              href="#responsive-header"
              class="block lg:inline-block lg:mt-0 text-gray-700 hover:text-white p-3 font-medium"
            >
              Was wir tun

              <div
                class="hidden flex text-gray-800 bg-white py-4 pb-6 px-3 rounded absolute shadow-2xl mt-2 -ml-5 cursor-default"
              >
                <div class="flex flex-col mx-2">
                  <h3 class="font-semibold text-lg pb-4">
                    Projekte
                  </h3>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Musikunterricht für Hörgeschädigte
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Kooperationsprojekte
                  </a>
                </div>
                <div class="flex flex-col mx-2">
                  <h3 class="font-semibold text-lg pb-4">
                    Veranstaltungen
                  </h3>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Support Inklusion – Support mal anders!
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Spektralkombüse – Erfahrbare Inklusion durch Musik, Tanz und
                    Kabarett
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Konzert, Workshops & Talk von/mit der Mischa Gohlke Band
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Aktionstage Inklusion in Schulen, Universitäten und anderen
                    Einrichtungen
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Grenzen sind relativ Festivals
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Grenzen sind relativ Netzwerkfeier
                  </a>
                </div>
              </div>
            </a>
            <a
              href="#responsive-header"
              class="block lg:inline-block lg:mt-0 text-gray-700 hover:text-white p-3 font-medium"
            >
              Blog
            </a>
            <a
              href="#responsive-header"
              class="block lg:inline-block lg:mt-0 text-gray-700 hover:text-white p-3 font-medium"
            >
              Über uns
            </a> -->
            <!-- <div
                class="flex text-gray-800 bg-white py-4 pb-6 px-3 rounded absolute shadow-2xl mt-2 -ml-5 cursor-default"
              >
                <div class="flex flex-col mx-2">
                  <h3 class="font-semibold text-lg pb-4">
                    Projekte
                  </h3>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Musikunterricht für Hörgeschädigte
                  </a>
                  <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                    Kooperationsprojekte
                  </a>
                </div>
                <div class="flex flex-col mx-2">
                  <h3 class="font-semibold text-lg pb-4">
                    Veranstaltungen
                  </h3>
                  <ul>
                    <li>
                      <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                        Support Inklusion – Support mal anders!
                      </a>
                    </li>
                    <li>
                      <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                        Spektralkombüse – Erfahrbare Inklusion durch Musik, Tanz und
                        Kabarett
                      </a>
                    </li>
                    <li>
                      <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                        Konzert, Workshops & Talk von/mit der Mischa Gohlke Band
                      </a>
                    </li>
                    <li>
                      <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                        Aktionstage Inklusion in Schulen, Universitäten und anderen
                        Einrichtungen
                      </a>
                    </li>
                    <li>
                      <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                        Grenzen sind relativ Festivals
                      </a>
                    </li>
                    <li>
                      <a href="" class="max-w-md -ml-2 px-2 py-1 hover:underline">
                        Grenzen sind relativ Netzwerkfeier
                      </a>
                    </li>
                  </ul>
                </div>
              </div>-->
          </div>
          <div>
            <a
              href="#"
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >Spenden</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-baseline p-3 bg-gray-100" v-if="navigation[currentMain].pages">
      <div class="container m-auto">
        <NavItemLevelTwo
          v-for="(nav, index) in navigation[currentMain].pages"
          :key="nav.url"
          :active="navigation[currentMain].pages.length && nav.url === navigation[currentMain].pages[currentSub].url"
          :to="nav.url"
          @click="currentSub = index"
        >
          {{ nav.title }}
        </NavItemLevelTwo>
        <!-- <NavItemLevelTwo to="/projekte" :active="true">Projekte</NavItemLevelTwo>
        <NavItemLevelTwo to="/">Veranstaltungen</NavItemLevelTwo>
        <NavItemLevelTwo to="/">Kampagnen</NavItemLevelTwo>
        <NavItemLevelTwo to="/">Workshop</NavItemLevelTwo>
        <NavItemLevelTwo to="/">Beratung & Coaching</NavItemLevelTwo>
        <NavItemLevelTwo to="/">Band</NavItemLevelTwo> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    open: true,
    currentMain: 2,
    currentSub: 0,
    navigation: [
      {
        title: 'Aktuelles',
        url: '/aktuelles',
      },
      {
        title: 'Über uns',
        url: '/ueber-uns',
      },
      {
        title: 'Aktivitäten',
        url: '/aktivitaeten',
        pages: [
          {
            title: 'Projekte und Veranstaltungen',
            url: '/projekte',
          },
          {
            title: 'Aufklärung, Dialog & Wissenstransfer',
            url: '/veranstaltungen',
          },
          {
            title: 'Netztwerkarbeit & Community',
            url: '/kampagnen',
          },
          {
            title: 'Kampagnen-Musikvideos',
            url: '/workshop',
          },
          {
            title: 'Musik & Inklusion',
            url: '/beratung-coaching',
          },
          {
            title: 'Allgemeine-Info',
            url: '/band',
          },
          {
            title: 'Öffentlichkeitsarbeite & Bewusstseinsbildung',
            url: '/band',
          },
        ]
      },
      {
        title: 'Media',
        url: '/media',
      },
      {
        title: 'Mitmachen',
        url: '/mitmachen',
      },
      {
        title: 'Kontakt',
        url: '/kontakt',
      },
    ]
  })
}
</script>
