<template>
  <div class="pt-16 pb-16">
    <Accordion>
      <accordion-panel>
        <accordion-header>Prečo je Quasar framework úžasný?</accordion-header>
        <accordion-content>
          <div>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              <Avatar size="lg" img="quasar.png" class="mx-3 my-3" />
              Quasar je open-source multiplatformový framework založený na Vue.js.
              Quasar obsahuje veľa komponentov používateľského rozhrania a prvkov rozloženia.
              Tieto prvky spolu poskytujú plnohodnotnú súpravu nástrojov na vytváranie responzívnych
              front-end aplikácií bez toho, aby ste museli využívať množstvo rôznych knižníc používateľského
              rozhrania. Robí to ťažké za vás, čo vám umožní sústrediť sa na to podstatné.
            </p>
            <p class="text-gray-500 dark:text-gray-400">
              Viac info sa
              dozviete na prednáške, ktorá sa bude konať 15.05. v čase od 8:00 do 16:00 hod.
            </p>
            <MyButton @click="modalShow(1)" name="Rezervovať"></MyButton>
          </div>
        </accordion-content>
      </accordion-panel>
      <accordion-panel>
        <accordion-header>Vue.js kurz</accordion-header>
        <accordion-content>
          <div>
            <div class="flex">
              <Avatar size="lg" img="js.png" class="mx-3 my-3" />
              <Avatar size="lg" img="vue.png" class="mx-3 my-3" />
            </div>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              Školenie je určené pre všetkých záujemcov, ktorí majú základy HTML, CSS a JavaScript a chcú sa vo vývoji
              webov dostať na nový level. Naučíme
              vás vytvoriť si vlastnú webovú aplikáciu efektívnym spôsobom a položíme silné základy pre to, aby ste sa
              dostali do obrazu, ako sa dá vytvoriť komplexná web aplikácia rýchlejšie ako so staršími postupmi tvorby webov.
              </p>
            <p class="text-gray-500 dark:text-gray-400">
              Kurz sa bude konať 15.05. a 16.05. v čase od 9:00 do 15:00 hod.
            </p>
            <MyButton @click="modalShow(2)" name="Rezervovať"></MyButton>
          </div>
        </accordion-content>
      </accordion-panel>
    </Accordion>
  </div>
  <Modal :size="modalSize"
         v-if="modalActive"
         @close="modalClose"
  >
    <template #header>
      <div v-if="modalStep === 0" class="flex items-center text-lg">
        Rezervácia | Osobné údaje
      </div>
      <div v-else-if="modalStep === 1" class="flex items-center text-lg">
        Rezervácia | Výber miesta
      </div>
    </template>
    <template #body v-if="modalStep === 0">
      <div style="max-width: 300px">
        <Input v-model="formData.name" aria-valuemin="2" type="text" size="md" placeholder="Meno" label="">
          <template #helper>
            <span v-if="helperName" class="text-red-400"> Aspoň 3 znaky.</span>
          </template>
        </Input>
        <Input style="padding-top: 10px" v-model="formData.surname" size="md" placeholder="Priezvisko" label="">
          <template #helper>
            <span v-if="helperSurname" class="text-red-400"> Aspoň 3 znaky.</span>
          </template>
        </Input>
        <Input style="padding-top: 10px" type="email" v-model="formData.email" size="md" placeholder="E-mail" label="">
          <template #helper>
            <span v-if="helperEmail" class="text-red-400"> Zadajte e-mail v správnom tvare.</span>
          </template>
        </Input>
        <Input type="tel" style="padding-top: 10px" v-model="formData.phone" size="md" placeholder="Telefónne číslo" label="">
          <template #helper>
            <span v-if="helperPhone" class="text-red-400"> Zadajte správne tel. číslo.</span>
          </template>
        </Input>
      </div>
    </template>
    <template #body v-else-if="modalStep === 1">
      <div class="flex flex-col justify-center items-center">
        <MyTable :disabled="loading">
          <tbody>
          <tr v-for="i in this.events.find(x => x.id === this.eventID).seatRowsCount" :key="i - 1"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <MyTdComponent :mark="(i - 1).toString() + (y - 1).toString()"
                           :occupied="placesOccupied"
                           :allActive="placesActive"
                           v-for="y in this.events.find(x => x.id === this.eventID).seatColumnsCount"
                           :key="y - 1"
                           class="px-6 border cursor-pointer"
                           @click="this.placesOccupied.includes((i - 1).toString() + (y - 1).toString()) ? '' : formPlaceSelector((i - 1).toString() + (y - 1).toString())">
            </MyTdComponent>
          </tr>
          </tbody>
        </MyTable>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <MyButton
            v-if="modalStep === 0"
            @click="modalClose"
            name="Zrušiť"
        >
        </MyButton>
        <MyButton
            v-if="modalStep > 0"
            @click="formPreviousStep"
            name="Späť"
        >
        </MyButton>
        <MyButton
            v-if="modalStep === 0"
            @click="formNextStep"
            name="Ďalej"
        >
        </MyButton>
        <!--<MyButton
            @click="this.loading = !this.loading"
            name="XXX"
        >
        </MyButton>-->
        <MyButton
            v-if="modalStep === 1"
            @click="formSubmit"
            name="Rezervuj"
        >
        </MyButton>
      </div>
      <div
          v-if="(success === true && loading === true) || (success === false && loading === false)"
          class="mt-3 flex justify-center">
        <Toast
            v-if="!loading"
            type="warning">
          <span class="text-red-400">Rezervácia nebola úspešná.</span>
        </Toast>
        <spinner v-if="loading" />
      </div>
    </template>
  </Modal>
</template>

<script>
import {defineComponent} from "vue";
import {
  Modal,
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
  Avatar,
  Table,
  Input,
  Spinner,
  Toast
} from 'flowbite-vue'
import MyTdComponent from "../components/MyTdComponent.vue";
import MyButton from "../components/MyButton.vue";
import MyTable from "../components/MyTable.vue";
import {useToastStore} from "../stores/toast";

export default defineComponent({
  name: "IndexPage",
  components: {
    MyTable,
    MyButton,
    MyTdComponent,
    Modal,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    Avatar,
    Table,
    Input,
    Spinner,
    Toast
  },
  data() {
    return {
      eventID: 1,
      loading: false,
      success: true,
      formData: {},
      helperName: false,
      helperSurname: false,
      helperEmail: false,
      helperPhone: false,
      modalStep: 0,
      modalActive: false,
      modalSize: 'xl',
      placesActive: [],
      placesOccupied: [],
      events: []
    }
  },
  watch: {
    name(newValue) {
      if (newValue === undefined) {
        this.helperName = false
      } else {
        this.helperName = newValue.length < 3;
      }
    },
    surname(newValue) {
      if (newValue === undefined) {
        this.helperSurname = false
      } else {
        this.helperSurname = newValue.length < 3;
      }
    },
    email(newValue) {
      if (newValue === undefined) {
        this.helperEmail = false
      } else {
        const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        this.helperEmail = !emailPattern.test(newValue.toString().trim());
      }
    },
    phone(newValue) {
      if (newValue === undefined) {
        this.helperPhone = false
      } else {
        const phonePattern = /(^(09|004219|\+4219)\d{8}$)|(^00(?!421)\d{2,18}$)|(^\+(?!421)\d{2,18}$)/
        this.helperPhone = !phonePattern.test(newValue.toString().trim());
      }
    }
  },
  computed: {
    name() {
      return this.formData.name;
    },
    surname() {
      return this.formData.surname;
    },
    email() {
      return this.formData.email;
    },
    phone() {
      return this.formData.phone;
    }
  },
  methods: {
    modalClose() {
      if (this.loading === false) {
        this.modalActive = false
        this.modalStep = 0
        this.formReset()
      }
    },
    modalShow(id) {
      this.eventID = id
      // this.formData.eventID = id
      this.placesOccupied = this.events.find(x => x.id === this.eventID).occupied
      this.modalActive = true
    },
    formPreviousStep() {
      if (this.loading === false) {
        this.placesActive = []
        this.success = true
        this.modalStep--
      }
    },
    formNextStep () {
      if ('name' in this.formData && 'surname' in this.formData && 'email' in this.formData && 'phone' in this.formData) {
        if (!this.helperName && !this.helperSurname && !this.helperEmail && !this.helperPhone) {
          this.modalStep++
        }
      }
    },
    formPlaceSelector (place) {
      if (this.placesActive.includes(place)) {
        let helper = [];
        const set = new Set(this.placesActive);
        this.placesActive = [...set];
        for (let i = 0; i < this.placesActive.length; i++) {
          if (this.placesActive[i] !== place) {
            helper.push(this.placesActive[i])
          }
        }
        this.placesActive = helper
      } else {
        if (this.placesActive.length < 2) {
          this.placesActive.push(place)
          const set = new Set(this.placesActive);
          this.placesActive = [...set];
        }
      }
    },
    formReset () {
      this.formData = {}
      this.helperName = false
      this.helperSurname = false
      this.helperEmail = false
      this.helperPhone = false
      this.placesActive = []
      this.placesOccupied = []
      this.success = true
    },
    formSubmit () {
      if (this.loading === false) {
        if ('name' in this.formData && 'surname' in this.formData && 'email' in this.formData && 'phone' in this.formData) {
          if (!this.helperName && !this.helperSurname && !this.helperEmail && !this.helperPhone && this.placesActive.length > 0 && this.placesActive.length < 3) {
            this.success = true
            this.loading = true
            this.saveReservation()
            .finally(() => {
              this.loadEvents()
              .finally(() => {
                this.loading = false
              })
            })
          }
        }
      }
    },
    saveReservation () {
      const data = {};
      for (const field in this.formData) {
        data[field] = this.formData[field];
      }
      data.event_id = this.eventID
      data.occupied = this.placesActive.join()
      return new Promise((resolve, reject) => {
        this.$api.post('/reservations', data)
            .then((response) => {
              this.success = true
              this.modalActive = false
              this.modalStep = 0
              this.formReset()
              this.toast.activate()
              resolve(response)
            })
            .catch((error) => {
              this.success = false
              reject(error)
            })
      })
    },
    loadEvents () {
      return new Promise((resolve, reject) => {
        this.$api.get('/events')
            .then((response) => {
              this.events.splice(0)
              this.events = response.data
              resolve(response)
            })
            .catch((error) => {
              this.events = [
                {id: 1, seatRowsCount: 5, seatColumnsCount: 10, occupied: ['14', '32']},
                {id: 2, seatRowsCount: 10, seatColumnsCount: 5, occupied: ['33']}
              ]
              reject(error)
            })
      })
    }
  },
  created () {
    this.loading = true
    this.loadEvents()
    .finally(() => {
      this.loading = false
    })
  },
  setup () {
    const toast = useToastStore()
    return { toast }
  }
});
</script>

<style scoped>

</style>
