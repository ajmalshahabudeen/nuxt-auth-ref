<template>
  <div class="flex">
    <Table class="w-full" v-if="data">
      <TableHeader>
        <TableRow>
          <TableHead>Sl No.</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Email Verified</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Admin</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead>UpdatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in data">
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell>
            {{ (item as any).id }}
          </TableCell>
          <TableCell>
            {{ (item as any).name }}
          </TableCell>
          <TableCell>
            {{ (item as any).email }}
          </TableCell>
          <TableCell>
            {{ (item as any).password }}
          </TableCell>
          <TableCell>
            {{ (item as any).emailVerified }}
          </TableCell>
          <TableCell>
            {{ (item as any).image }}
          </TableCell>
          <TableCell>
            {{ (item as any).admin ? 'Yes' : 'No' }}
          </TableCell>
          <TableCell>
            {{ (item as any).createdAt }}
            </TableCell>
            <TableCell>
              {{ (item as any).updatedAt }}
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <p v-else class="text-red-500">You are not an Admin to view this Data</p>
  </div>
</template>

<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const data = ref()
onMounted(async () => {
  const result = await getUsers()
  data.value = (result as any).data
})
// console.log(data)

</script>

<style></style>