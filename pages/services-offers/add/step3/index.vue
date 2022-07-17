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
        <!-- Switch -->
        <el-form-item prop="offer">
          <span class="d-block">Offer</span>
          <el-switch
            v-model="offer"
            active-value="1"
            inactive-value="0"
            active-color="#EA3162"
          ></el-switch>
        </el-form-item>
      </div>
      <div v-if="offer == '1'" class="d-flex justify-content-around">
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
  data() {
    return {
      form: {
        price: "",
        priceAfterDiscount: "",
        startOffer: "",
        endOffer: "",
      },
      formRules: {
        price: [{ required: true, message: "Please enter price" }],
        priceAfterDiscount: [
          { required: true, message: "Please enter price after discount" },
        ],
        startOffer: [{ required: true, message: "Please enter start time" }],
        endOffer: [{ required: true, message: "Please enter end time" }],
      },
      offer: "",
      newService: {},
    };
  },
  methods: {
    goBack() {
      this.$router.push("/services-offers/add/step2");
    },
    createService() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const form1 = JSON.parse(sessionStorage.getItem("form1"));
          const form2 = JSON.parse(sessionStorage.getItem("form2"));
          this.newService = {
            ...form1,
            ...form2,
            ...this.form,
          };
          console.log(this.newService);
        }
      });
    },
  },
};
</script>

<style></style>
