<template>
  <section class="section section-margin-top">
    <div class="container">
      <h1 class="section-title text-link">Контакты</h1>
      <div class="columns is-multiline is-centered">
        <div class="column is-4">
          <p class="title is-4 text-link">
            <span>Звоните&nbsp;<font-awesome-icon icon="phone-flip" /></span>
          </p>
          <p class="subtitle is-4 text-primary">
            Михаил<br />
            <a href="tel: 89277714551" class="text-primary"
              >+7 (927) 771-45-51</a
            ><br />
            <a
              class="text-primary"
              href="https://wa.me/79277714551?text=Здравствуйте,%20я%20хотел(а)%20бы%20заказать%20дизайн-проект."
              target="_blank"
              ><font-awesome-icon
                :icon="['fab', 'whatsapp']"
              />&nbsp;WhatsApp</a
            ><br /><br />
            Лариса<br />
            <a class="text-primary" href="tel: 89270265475"
              >+7 (927) 026-54-75</a
            ><br />
            <a
              class="text-primary"
              href="https://wa.me/79270265475?text=Здравствуйте,%20я%20хотел(а)%20бы%20заказать%20дизайн-проект."
              target="_blank"
              ><font-awesome-icon
                :icon="['fab', 'whatsapp']"
              />&nbsp;WhatsApp</a
            >
          </p>
        </div>

        <div class="column is-4">
          <p class="title is-4 text-link">
            <span>Пишите&nbsp;<font-awesome-icon icon="pencil" /></span>
          </p>
          <p class="subtitle is-4">
            <a
              class="text-primary"
              href="https://vk.com/odyssey_mebel"
              target="_blank"
              >ВКонтакте</a
            ><br />
            <a
              class="text-primary"
              href="https://instagram.com/newstyle063"
              target="_blank"
              >Инстаграм</a
            >
          </p>
        </div>
        <div class="column is-4">
          <p class="title is-4 text-link">
            <span>Присылайте&nbsp;<font-awesome-icon icon="envelope" /></span>
          </p>
          <p class="subtitle is-4">
            <a class="text-primary" href="mailto: newstyle063@yandex.ru"
              >newstyle063@yandex.ru</a
            >
          </p>
          <p class="title is-4 text-link">
            <br /><br /><br /><span
              >Наш адрес&nbsp;<font-awesome-icon icon="city"
            /></span>
          </p>
          <p class="subtitle is-4 text-primary">
            <a
              class="text-primary"
              href="https://yandex.ru/maps/?rtext=~53.548569%2C49.341895"
              target="_blank"
              >Россия, Самарская обл., г. Тольятти</a
            >
          </p>
        </div>
        <div class="column is-4">
          <p class="title is-4 text-link">
            <span>Связаться с нами</span>
          </p>
          <!-- <form action="/functions/sendEmail.php" method="post" id="sendEmail"> -->
          <form id="contactToUs">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Имя"
                  name="name"
                  v-model="contactFormData.name"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="tel"
                  placeholder="Телефон"
                  name="phone"
                  v-model="contactFormData.phone"
                />
              </div>
            </div>
            <!-- <div class="field">
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="Сообщение"
                  name="message"
                  v-model="contactFormData.message"
                ></textarea>
              </div>
            </div> -->
            <div class="field">
              <div class="control">
                <a
                  class="button is-primary is-fullwidth"
                  name="send"
                  :href="getSendEmailLink(contactFormData)"
                >
                  Отправить
                </a>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <span class="has-text-grey-light text-link is-size-7">
                  Отправляя данные, вы соглашаетесь с
                  <a class="has-text-grey-light" href="/privacy"
                    ><u>Политикой конфиденциальности</u></a
                  >
                </span>
              </div>
            </div>
          </form>
        </div>
        <div class="column is-4"></div>
        <div class="column is-4">
          <p class="subtitle is-4 text-primary">
            Работаем ежедневно<br />
            с 08:00 до 18:00 (МСК)
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      contactFormData: {
        name: "",
        phone: "",
        message: "",
      },
      success: false,
      error: false,
    };
  },
  methods: {
    getSendEmailLink: function (contactFormData) {
      return (
        "mailto:newstyle063@yandex.ru?subject=" +
        "C www.odyssey-mebel.ru - " +
        encodeURIComponent(contactFormData.name) +
        " " +
        contactFormData.phone +
        "&body=" +
        encodeURIComponent(contactFormData.name) +
        " %0D%0A" +
        contactFormData.phone +
        "%0D%0A" +
        encodeURIComponent(contactFormData.message)
      );
    },
  },
  // methods: {
  //     sendMail: function () {
  //         const url = 'sendEmail.php';
  //         const {name, phone, message} = this.contactFormData;
  //         const payload = {name, phone, message};
  //         fetch(url, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(payload)
  //         })
  //             .then(() => {
  //                 this.success = true;
  //                 this.resetForm();
  //             })
  //             .catch(() => {
  //                 this.error = true;
  //             })
  //     },
  //     resetForm: function () {
  //         this.contactFormData = {
  //             name: '',
  //             phone: '',
  //             message: '',
  //         };
  //     },
  // }
};
</script>
