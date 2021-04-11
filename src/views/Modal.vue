<template>
    <div id="modalDelete" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="media-body">
                    <p>{{msg}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Modal",
  props: ['msg'],
  methods: {
    show: function(){
      console.log("c")
      this.$bvModal.show("modalDelete")
      console.log("d")
    }
  }      
}
</script>