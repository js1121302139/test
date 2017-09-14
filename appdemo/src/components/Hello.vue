<template>
  <div>
    <group>
      <cell title="Total" :value="total"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
    <divider>{{ ('I have bottom line') }}</divider>
    <grid :rows="2">

    </grid>
    <input type="file" accept="image/*">
  </div>
</template>

<script>
  import { CellFormPreview, Group, Cell, Grid, GridItem ,Divider  } from 'vux'
  import  vueResource from "vue-resource"
  import Vue from "vue"
  Vue.use(vueResource);
  export default {
    components: {
      CellFormPreview,
      Group,
      Cell,
      Grid,
      GridItem,
      Divider
    },
    data () {
      return {
        list: [{
          label: 'Apple',
          value: 3.29
        }, {
          label: 'Banana',
          value: 1.04
        }, {
          label: 'Fish',
          value: 8.00
        }, {
          label: 'js',
          value: 9.90
        }, {
          label: 'app',
          value: 13.00
        }]

      }
    },
    mothed:{


    },
    computed:{
      total () {
        this.money=0;
        for(var i=0;i<this.list.length;i++ ){
          this.money += parseFloat(this.list[i].value);
        }
        return this.money.toFixed(2);
      }

    }
  }
</script>

<style>
  .doo{
    height: 60px;
  }
</style>
