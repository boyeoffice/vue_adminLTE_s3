<template>
  <section class="content">
    <div class="row">
      <div class="col-md-8">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">{{title}}</h3>
          </div>
          <div class="box-body">
            <form action>
              <div :class="{'form-group': true, 'has-error': errors.get('sku')}">
                <label for="sku">
                  Sku
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="text"
                  :class="{'form-control': true}"
                  v-model="form.sku" 
                  placeholder>
              </div>
              <div :class="{'form-group': true, 'has-error': errors.get('name')}">
                <label for="name">
                  Name
                  <span class="text-danger">*</span>
                </label>
                <input 
                  type="text"
                  :class="{'form-control': true}"
                  v-model="form.name" 
                  placeholder>
              </div>
              <div :class="{'form-group': true}">
                <label for="description">
                  Description
                </label>
                <textarea
                   type="text" 
                   class="form-control"
                   v-model="form.description"
                   placeholder
                   rows="5"/>
              </div>
              <div :class="{'form-group': true, 'has-error': errors.get('price')}">
                <label for="price">Price
                  <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                <span class="input-group-addon">Naira</span>
                <input
                   type="text" 
                   class="form-control"
                   v-model="form.price">
                </div>
              </div>
              <div :class="{'form-group': true, 'has-error': errors.get('quantity')}">
                <label for="qauntity">Quantity
                  <span class="text-danger">*</span>
                </label>
                <select2 v-model="form.quantity">
                  <option value="">Select Quantity</option>
                  <option 
                    :value="num"
                    :key="num"
                    v-for="num in quantity">
                    {{num}}
                    </option>
                </select2>
              </div>
              <div class="form-group">
                <label for="brand">Brand</label>
                <select2 v-model="form.brand">
                  <option value="">None</option>
                </select2>
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <select2 v-model="form.status">
                  <option value="">None</option>
                  <option value="active">Enable</option>
                  <option value="disable">Disable</option>
                </select2>
              </div>
            </form>
          </div>
          <div class="box-footer">
            <div class="row">
              <div v-for="(data, index) in form.images" 
                    v-if="form.images.length > 0" class="col-md-2"
                    @click="removeImage(index)">
                <div class="box-photo"
                    :style="{backgroundImage: 'url(' + data.card + ')'}">
                      <i class="fa fa-trash text-danger"></i>
                </div>
              </div>
              <div v-if="form.images.length < 6" class="col-md-2">
                <div class="box-photo"
                     @click="openProductModal = true">
                      <i class="fa fa-plus-square-o"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="box box-solid">
          <div class="box-body">
            <div class="row form-group">
              <div class="col-xs-6 col-sm-6 col-md-6">
                <button
                   v-if="vissibleButton"
                   class="btn btn-block btn-primary" 
                   @click="createProduct">
                   Save
                </button>
                <button
                  v-else
                  class="btn btn-block btn-info">
                  Loading
                  <i class="fa fa-spinner fa-spin"></i>
                </button>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6">  
                <button
                  class="btn btn-block btn-danger" 
                  @click="clearProduct">
                  Clear
                </button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12 no-padding">
                <label for="weight">Weight</label>
                <small class="text text-warning">optional</small>
              </div>
              <div class="col-md-6 no-padding">
                <input 
                  type="text" 
                  class="form-control"
                  placeholder="0.00"
                  v-model="form.weight">
              </div>
              <div class="col-md-6 no-padding">
                <select2>
                  <option value="ounce">OUNCES</option>
                </select2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
       <div class="box box-solid">
         <div class="box-header with-border">
           <h3 class="box-title">Add cover</h3>
         </div>
         <div class="box-body">
           <div class="shot-preview"
              :style="{backgroundImage: 'url(' + form.cover + ')'}"
              @click="showCoverModal = true">
             Select an image
           </div>
         </div>
       </div>
      </div>
    </div>
<!-- show cover upload cover -->
    <modal 
			v-if="showCoverModal" 
			@close="showCoverModal = false"
			@set-featured="setCover"/>
      <modal 
			v-if="openProductModal" 
			@close="openProductModal = false"
			@set-featured="setProductImage"/>
  </section>
</template>

<script>
class Errors {
  constructor() {
    this.errors = {};
  }
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }
  record(errors) {
    this.errors = errors.errors;
  }
}
import Select2 from '@/components/Select2'
import Modal from '@/components/ImageModal'
export default {
  components: {
      Select2,
      Modal
  },
  data: function() {
    return {
      title: 'Create new product',
      form: {
        images: []
      },
      errors: new Errors(),
      quantity: [1,2,3,4,5,6,7,8,9,10,15,20,25,30],
      vissibleButton: true,
      showCoverModal: false,
      openProductModal: false,
    };
  },
  methods: {
    createProduct: function() {
      var imgs = []
      this.form.images.forEach((img) =>{
        imgs.push(img.id)
      })
      this.form.imgs = imgs
      this.vissibleButton = false
      this.$store.dispatch('createProduct', this.form).then(response => {
        this.$router.push('/products')
      }).catch(error => {
        this.vissibleButton = true
        this.errors.record(error.response.data)
        var getError = error.response.data.errors
        toastr.warning(
          getError.sku[0],
          getError.name[0]
        )
      })
    },
    clearProduct: function() {
      this.form = {};
    },
    setCover(item){
      this.form.cover = item.card
      this.form.cover_id = item.id
      this.showCoverModal = false
    },
    setProductImage(item){
      this.form.images.push(item)
      this.openProductModal  = false
    },
    removeImage(index){
      this.form.images.splice(index, 1)
    }
  }
}
</script>