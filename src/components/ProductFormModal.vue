<template>
  <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="editLabel">{{modalTitle}}</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- main product -->
            <div class="col-md-8">
              <div class="input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="product-name">Product name</label>
                </div>
                <input type="text" v-model="product.name"
                       class="form-control" id="product-name">
              </div>
              <div class="input-group description-ctn">
                <div class="input-group-prepend">
                  <span class="input-group-text">Description</span>
                </div>
                <textarea v-model="product.description" class="form-control"
                          aria-label="With textarea" rows="10" id="product-description" />
              </div>
            </div>
            <!-- product sidebar -->
            <div class="col-md-4">
              <h5 class="display-6">Product Details</h5>
              <hr>
              <div class="input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="product-price">Price</label>
                </div>
                <input type="text" v-model="product.price"
                       class="form-control" id="product-price">
              </div>
              <div class="input-group tag-ctn">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="product-tags">Tags</label>
                </div>
                <input type="text" @keyup.enter="addTag" v-model="tag"
                       class="form-control" id="product-tags">
              </div>
              <div class="badges-ctn">
                <span v-for="(tag, i) in product.tags" :key="tag" class="badge-ctn" @click="deleteTag(tag, i)">
                  <span class="badge badge-secondary">{{tag}}</span>
                </span>
              </div>
              <div class="form-group image-ctn">
                <label for="product_image">Images</label>
                <input type="file" @change="uploadImage" class="form-control">
              </div>
              <div class="form-group text-left">
                <div v-for="(image, index) in product.images" :key="index" class="image-thumb-ctn">
                  <img :src="image" alt="">
                  <span class="delete-img" @click="deleteImage(image, index)">X</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="callAddProduct()" type="button" class="btn btn-primary" v-if="modalType === 'new'">Save changes</button>
          <button @click="callUpdateProduct()" type="button" class="btn btn-primary" v-if="modalType === 'edit'">Apply changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb } from '../firebase';

export default {
  name: 'ProductFormModal',
  props: {
    product: { type: Object, default: () => {}},
    modalType: { type: String, default: 'new'},
  },
  computed: {
    modalTitle() {
      if (this.modalType === 'new') {
        return 'Add product';
      } return 'Edit product';
    },
  },
  data() {
    return {
      tag: undefined,
    };
  },
  methods: {
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = '';
    },
    callAddProduct() {
      this.$emit('addProduct');
    },
    callUpdateProduct() {
      this.$emit('updateProduct');
    },
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(() => {})
        .catch((err) => {
          console.log('err : ', err);
        })
    },
    deleteTag(tag, i) {
      this.product.tags.splice(i, 1);
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', () => {}, function() {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.product.images.push(downloadURL);
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.description-ctn, .tag-ctn {
  margin-top: 13px;
}

.badges-ctn {
  margin-top: 5px;
  max-width: 100%;
  text-align: left;

  .badge-ctn {
    font-size: 20px;
    cursor: pointer;

    span:hover {
      background: #dc3545;
    }

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
}

.image-ctn {
  margin-top: 20px;
}

.img-wrapper {
  img {
    height: 70px;
  }
}

.image-thumb-ctn {
  position: relative;
  display: inline-block;
  margin: 5px;

  img {
    height: 70px;
    width: 70px;
  }

  .delete-img {
    position: absolute;
    top: 0;
    right: 0;
    color: #dc3545;
    cursor: pointer;
  }
}
</style>