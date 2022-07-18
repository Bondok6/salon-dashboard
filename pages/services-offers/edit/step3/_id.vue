<template>
  <section class="main-form mb-5">
    <h2 class="main-form__title">Add Service</h2>

    <div class="text-center my-5">
      <img src="@/assets/images/services/step3.png" alt="step3" />
    </div>

    <el-form :rules="formRules" :model="form" ref="form" class="mt-5">
      <div class="d-flex gap-5">
        <el-form-item prop="price">
          <span class="d-block">Price $</span>
          <el-input-number
            v-model="form.price"
            :controls="false"
          ></el-input-number>
        </el-form-item>

        <el-form-item prop="offer">
          <span class="d-block">Offer</span>
          <el-switch
            v-model="offer"
            active-value="true"
            inactive-value="false"
            active-color="#EA3162"
          ></el-switch>
        </el-form-item>
      </div>

      <div v-if="offer === 'true'" class="d-flex justify-content-around">
        <el-form-item label="Price After Discount" prop="priceAfterDiscount">
          <el-input-number
            v-model="form.priceAfterDiscount"
            :controls="false"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="Start" prop="startOffer">
          <el-date-picker
            v-model="form.startOffer"
            type="datetime"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="End" prop="endOffer">
          <el-date-picker
            v-model="form.endOffer"
            type="datetime"
            placeholder="Select date and time"
          >
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>

    <button class="btn btn--pink btn--add" @click.prevent="createService()">
      Save
    </button>
    <button class="btn btn--white btn--add" @click.prevent="goBack()">
      Cancel
    </button>
  </section>
</template>

<script>
export default {
  async mounted() {
    const { id } = this.$route.params;
    const data = await this.$store.dispatch("services/fetchService", id);
    if (data.price.priceAftereOffer) {
      this.offer = true;
      this.form.priceAfterDiscount = data.price.priceAftereOffer;
      this.form.startOffer = data.price.startOffer;
      this.form.endOffer = data.price.endOffer;
      this.form.price = data.price.price;
    } else {
      this.offer = false;
      this.form.price = data.price.price;
    }
  },
  data() {
    return {
      form: {},
      formRules: {
        price: [{ required: true, message: "Please enter price" }],
        priceAfterDiscount: [
          { required: true, message: "Please enter price after discount" },
        ],
        startOffer: [{ required: true, message: "Please enter start time" }],
        endOffer: [{ required: true, message: "Please enter end time" }],
      },
      offer: "false",
      enabled: "false", // show/hide form mobile app
    };
  },
  methods: {
    goBack() {
      this.$router.push("/services-offers/add/step2");
    },
    createService() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading();
          try {
            const form1 = JSON.parse(sessionStorage.getItem("form1"));
            const form2 = JSON.parse(sessionStorage.getItem("form2"));
            let form3 = {};
            const enabled = this.offer === "true" ? true : false;
            if (enabled) {
              const start = new Date(this.form.startOffer);
              const end = new Date(this.form.endOffer);
              const startOfferDate = start.toISOString();
              const endOfferDate = end.toISOString();
              form3 = {
                price: {
                  price: this.form.price,
                  priceAftereOffer: this.form.priceAfterDiscount,
                  startOfferDate,
                  endOfferDate,
                },
                enabled,
              };
            } else {
              form3 = {
                price: {
                  price: this.form.price,
                },
                enabled,
              };
            }

            const newService = {
              ...form1,
              ...form2,
              ...form3,
            };

            console.log(newService);
            await this.$store.dispatch("services/addService", newService);
            this.$router.push("/services-offers");
            this.$message.success("Service created successfully");

            // clear session storage
            sessionStorage.removeItem("form1");
            sessionStorage.removeItem("form2");
          } catch (error) {
            this.$message.error("Service Creation Failed");
          } finally {
            loading.close();
          }
        }
      });
    },
  },
};
</script>
