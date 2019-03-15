<template>
    <div class="modal img-modal">
        <div class="modal-dialog img-dialog">
            <div class="modal-content">
                <div class="modal-header img-header">
                    <ul class="pull-left">
                        <li :class="{'tb': showUpload}">
                            <a @click="toggleUpload" href="javascript:void(0)">Upload Files</a>
                        </li>
                        <li :class="{'tb': showMedia}">
                            <a @click="toggleMedia" href="javascript:void(0)">Media Library</a>
                        </li>
                    </ul>
                    <button 
                        type="button" 
                        data-dismiss="close" 
                        class="close"
                        aria-label="Close"
                        @click="$emit('close')">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="showUpload" class="sl">
                        <div class="sl-wr">
                            <div class="sl-inner">
                            <h2>Drop files anywhere to upload</h2>
                            <p>or</p>
                            <a  v-if="showButton"
                                href="javascript:void(0);"
                                @click="$refs.fileInput.click()"
                                class="btn">
                                <i class="fa fa-camera-retro"></i>
                                Select Files
                            </a>
                            <div v-else class="progress">
                                <div class="progress-bar" 
                                    role="progressbar" 
                                    aria-valuenow="60" aria-valuemin="0" 
                                    aria-valuemax="100" :style="{width: progressBar}">
                                    {{progressBar}}
                                </div>
                            </div>
                            <small class="text text-info">
                                You can upload multiple files at once.
                            </small>
                            </div>
                            <input 
                                ref="fileInput"
                                id="file-upload" 
                                type="file" 
                                style="display: none"
                                @change="onFileChange">
                        </div>
                    </div>
                    <div v-else class="md-c">
                        <div class="row">
                            <div 
                                class="col-xs-6 col-sm-3 col-md-2"
                                v-for="(item, index) in model">
                                <div class="thumbnail" @click="selectedClass(index)">
                                    <a 
                                    href="javascript:void(0);"
                                    class="md-c-link"
                                    @click="pluckImage = item">
                                    <img 
                                        :src="item.card" alt=""
                                        class="img img-responsive"
                                        height="113"/>
                                    <div :class="{'bg': true, 'vb': selected == index }">
                                        <span class="fa fa-check"></span>
                                    </div>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="! showUpload" class="pagination">
                        <div class="pagination-items">
                            <button class="btn btn-success btn-sm">Prev</button>
                            <button class="btn btn-success btn-sm">Next</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        class="pull-left btn btn-default btn-sm" 
                        data-dismiss="close"
                        @click="$emit('close')">
                        Close
                    </button>
                    <button 
                        :disabled="! pluckImage"
                        class="btn btn-primary btn-sm"
                        @click="$emit('set-featured', item = pluckImage)">
                        Set featured image
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return{
                showUpload: true,
                showMedia: false,
                selectedImage: null,
                progressBar: 0,
                showButton: true,
                model: [],
                pluckImage: null,
                selected: null
            }
        },
        methods: {
            toggleUpload(){
                this.showMedia = false
                this.showUpload = true
            },
            toggleMedia(){
                this.showUpload = false
                 this.showMedia = true
                 this.fetchImage()
            },
            onFileChange(event){
                this.selectedImage = event.target.files[0]
                this.createImage()
            },
            createImage(){
                let formData = new FormData()
                formData.append('image', this.selectedImage)
                this.uploadImage(formData)
                this.showButton = false
            },
            uploadImage: _.debounce(function(formData){
                return new Promise(() => {
                    axios.post('api/v2/attachments', formData, {
                        onUploadProgress: uploadEvent => {
                             this.progressBar = Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%'
                        }
                    }).then(response => {
                        this.toggleMedia()
                        this.showButton = true
                        this.progressBar = 0
                    }).catch(error => {
                        this.showButton = true
                        this.progressBar = 0
                        toastr.warning(error.response.data.image[0])
                    })
                })
            }),
            fetchImage(){
                return new Promise(() => {
                    axios.get('api/v2/attachments').then(response => {
                        this.model = response.data.data
                    }).catch(error => {
                        //
                    })
                })
            },
            selectedClass(index){
                this.selected = index
            }
        }
    }
</script>