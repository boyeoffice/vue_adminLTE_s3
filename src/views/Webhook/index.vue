<template>
	<div class="content">
	<div class="col-md-12">
		<div class="box box-solid">
			<div class="box-header with-border">
				<h3 class="box-title">Sites</h3>
				<div class="box-tools pull-right">
					<router-link :to="{name: 'CreateSite'}" class="bnt btn-sm btn-success">Create</router-link>
				</div>
			</div>
			<div class="box-body">
				<table class="table table-hover">
					<thead>
						<tr>
							<th v-for="thead in theads">{{thead}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in model">
							<td>{{ data.name }}</td>
							<td>{{ data.url }}</td>
							<td>{{ data.count }}</td>
							<td>{{ data.type }}</td>
							<td>
								<i :class="{
									'fa fa-circle': true,
									'text-success': data.status == 1,
									'text-danger': data.status == 0
								}"></i>
							</td>
							<td>{{ data.updated_at }}</td>
							<td>
								<router-link :to="'/webhook/' + data.id" class="btn btn-primary btn-sm">
									<i class="fa fa-eye"></i>
								</router-link>
								<router-link :to="'/webhook/' + data.id + '/edit'" class="btn btn-success btn-sm">
									<i class="fa fa-pencil-square-o"></i>
								</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return{
				theads: ['Name', 'Url', 'Count', 'Type', 'Status', 'Updated at', 'Actions'],
				model: []
			}
		},
		methods:{
			fectchData(){
				axios.get('api/v1/site').then(response => {
					this.model = response.data
				})
			}
		},
		created(){
			this.fectchData()
		}
	}
</script>