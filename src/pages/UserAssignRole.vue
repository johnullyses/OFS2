<template>
  <div class="q-pa-md" container>
      	<div class="q-pa-md row" style="margin-left: 15px; margin-right: 15px; padding-left: 0px; border-bottom: 2px solid #DEDEDE; ">
			<div class="col-6">
				<div style="font-size: 20px"><b>User Assign Role</b></div>
			</div>
			<div class="col-6">
				<div style="font-size: 15px; text-align: right"><b>Date: </b>{{this.todate}}</div>
			</div>
      	</div>
		
		<div class="q-pa-md" style="min-height: 100vh">
			<div class="row items-start" style="margin-bottom: 10px">
				<div class="col-xs-12 col-sm-6 col-md-2 gutter">
					<q-input bg-color="white" outlined v-model="filter" label="Search" dense>
					<template v-slot:append>
						<q-icon name="search" ></q-icon>
					</template>
				</q-input> 
				</div>
			</div>
			<q-table
				id="test"
				:pagination="initialPagination"
				color="primary"
				:columns="columns"
				:rows="users"
				row-key="name"
				ref="tb"
				:filter="filter"
				:loading="loading"
			>
			<template v-slot:body-cell-role_id="props">
				<q-td :props="props">
					<div v-if="editable == true && editRoleId == props.row.id">
						<q-select
							style="padding: 0"
							bg-color="white" 
							outlined 
							:options="roles"
							v-model="user_role"
							option-value="id"
							option-label="name"
							label="Roles"
							:error="!isvalid"
							dense>
						</q-select>
					</div>
					<div v-else>
						{{ getRoles(props.row.role_id) }}
					</div>
				</q-td>
          	</template>
			<template v-slot:body-cell-action="props">
				<q-td :props="props">
					<div v-if="editable == true && editRoleId == props.row.id">
						<q-btn
							color="green"
							label="Save"
							no-caps
							:loading="loadingUpdate"
							style="margin-right: 8px"
							@click="updateRole(props.row.id)"
						></q-btn>
						<q-btn
							color="red"
							label="Cancel"
							no-caps
							style="margin-right: 8px"
							@click="editRole(editable = false)"
						></q-btn>
					</div>
					<div v-else>
						<q-btn
							color="primary"
							label="Edit"
							no-caps
							style="margin-right: 8px"
							@click="editRole(props.row.id)"
						></q-btn>
					</div>
				</q-td>
          	</template>
			</q-table>
		</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { defineComponent } from 'vue';
import { ref } from 'vue'

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0");

export default {
	name: 'UserAssignRole',
	async beforeMount() {
		await this.userRoles();
		await this.getUsers();
	},
	data() {
		return {
			todate: date,
			filter: ref(''),
			initialPagination: {
				sortBy: 'desc',
				descending: true,
				rowsPerPage: 25
			},
			columns: [
				{ name: 'name', label: 'Name', field: 'name', align: 'center' },
				{ name: 'email', label: 'Email', field: 'email', align: 'center' },
				{ name: 'role_id', label: 'Role', field: 'role_id', align: 'center' },
				{ name: 'action', label: 'Actions', field: 'action', align: 'center' },
			],
			editable: false,
			editRoleId: '',
			isDisabled: false,
			user_role: '',
			loadingUpdate: false,
			isvalid: true
		}
	},
	computed: {
		...mapGetters('UserAssigneRole', {
			users: 'GET_USERS',
			roles: 'GET_ROLES',
			loading: 'GET_LOADING',
		})
	},
	methods: {
		...mapActions('UserAssigneRole', [
			'getUsers',
			'userRoles',
			'updateUserRole'
        ]),
		editRole(role_id) {
			this.editable = true;
			this.editRoleId = role_id
			this.isDisabled = true
			this.isvalid = true
		},
		getRoles(role_id) {
			if (role_id == null) {
				return ''
			} else {
				var arr = this.roles.filter(item => {
					return item.id == role_id
				});
				return arr[0].name
			}
		},
		updateRole(user_id) {
			this.loadingUpdate = true
			if (this.user_role) {
				this.updateUserRole({
				user_id: user_id,
				role_id: this.user_role['id']
				}).then(async() => {
					this.editable = false
					this.loadingUpdate = false
					await this.getUsers();
				})
				this.isvalid = true
			} else {
				this.isvalid = false
				console.log("wala")
				this.loadingUpdate = false
			}
		}
	}
}
</script>
<style>
.q-table thead tr {
    background-color: #e9e9e9; 
}

</style>