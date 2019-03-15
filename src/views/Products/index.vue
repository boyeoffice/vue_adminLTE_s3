<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">Products</h3>
            <div class="box-tools pull-right">
              <router-link :to="{name: 'CreateProduct'}" class="btn btn-sm btn-success">
                <i class="fa fa-plus-o"></i> Create
              </router-link>
            </div>
          </div>
          <div class="box-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th v-for="(th,index) in thead" :key="index">
                    {{th.label}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in products.data">
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <span :class="{'text': true, 
                      'text-success': item.status == 'active',
                      'text-danger': item.status == 'disable'}">
                      {{ item.status }}
                      </span>
                    </td>
                    <td>
                      
                      <form @submit.prevent="deleteProduct(item, index)"> 
                        <router-link :to="'/' + item.slug"
                        class="btn btn-sm btn-default">
                        <i class="fa fa-eye"></i>
                      </router-link>
                      <router-link 
                            :to="'/product/' + item.slug + '/edit'"
                            class="btn-primary btn btn-sm">
                            <i class="fa fa-edit"></i>
                          </router-link>
                          <button 
                            class="btn btn-danger btn-sm"
                            onClick="return confirm('Are you sure?')">
                            <i class="fa fa-trash-o"></i>
                            </button>
                      </form>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters} from 'vuex'
  export default {
    data: function(){
      return{
        thead: [
          {label: 'Name'},
          {label: 'Quantity'},
          {label: 'Price'},
          {label: 'Status'},
          {label: 'Action'}
        ],
        params: {
          column: 'id',
          direction: 'desc',
          per_page: 10,
          page: 1,
          search_column: 'name',
          search_operator: 'equal_to',
          search_query_1: '',
          search_query_2: ''
        },
        source: 'api/v2/products'
      }
    },
    created: function(){
      document.title = 'Products | Yomi.ml'
      this.fetchData()
    },
    methods: {
      fetchData(){
        return new Promise(() => {
          axios.get(this.buildURL()).then(response => {
            console.log(response)
            this.$store.commit('RECIEVE_PRODUCTS', response.data)
          }).catch(error => {

          })
        })
      },
      buildURL(){
        var p = this.params
        return `${this.source}?column=${p.column}&direction=${p.direction}&per_page=${p.per_page}&page=${p.page}&search_column=${p.search_column}&search_operator=${p.search_operator}`
      },
      deleteProduct(item, index){
        return new Promise(() => {
          axios.delete('api/v2/product/' + item.id).then(response => {
            this.$store.commit('REMOVE_PRODUCT', index)
          }).catch(error => {

          })
        })
      }
    },
    computed: 
      mapGetters(['products'])
  }
</script>
