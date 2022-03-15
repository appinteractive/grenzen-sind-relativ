<template>
  <div class="pb-12">
    <div class="" :key="k">
      <div v-for="area in items" :key="area.title">
        <h3 class="pt-6 sm:!-mb-4">{{ area.title }}</h3>
        <div
          class="
            space-y-6
            md:space-y-0
            md:gap-x-8 md:space-y-0 md:grid
            grid-cols-2
          "
        >
          <div v-for="person in area.children" :key="person.name">
            <router-link :to="person.path" class="!no-underline">
              <div
                class="
                  space-y-4
                  md:space-y-0
                  sm:grid sm:grid-cols-3 sm:items-start sm:gap-6
                  group
                  px-4
                  md:px-0
                "
              >
                <div class="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                  <img
                    class="object-cover rounded shadow-md"
                    :src="person.teaser"
                    :alt="person.title"
                  />
                </div>
                <div class="sm:col-span-2 pt-6 sm:pt-0 md:pt-2">
                  <div class="space-y-4">
                    <div>
                      <h4 class="group-hover:!underline !leading-tight">
                        {{ person.title }}
                      </h4>
                      <!-- <p class="text-indigo-600">{{ person.role }}</p> -->
                    </div>
                    <div class="text-lg">
                      <p
                        class="
                          text-gray-800
                          line-clamp-3
                          text-base
                          font-normal
                          leading-snug
                        "
                      >
                        {{ person.description }}
                      </p>
                    </div>
                    <!-- <div class="flex space-x-5">
                      <div>
                        <a :href="person.twitterUrl" class="text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Twitter</span>
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>
                      <div>
                        <a :href="person.linkedinUrl" class="text-gray-400 hover:text-gray-500">
                          <span class="sr-only">LinkedIn</span>
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function makeid(length = 8) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default {
  props: {
    people: { type: [Array, String], default: () => [] },
  },
  data: () => ({
    k: makeid(),
  }),
  computed: {
    items() {
      const people = Array.isArray(this.people)
        ? this.people
        : JSON.parse(this.people)
      return people
    },
  },
  mounted() {
    this.k = makeid()
  },
}
</script>
