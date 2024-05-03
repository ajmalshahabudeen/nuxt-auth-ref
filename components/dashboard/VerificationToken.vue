<template>
  <div class="flex">
    <Table class="w-full" v-if="data">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sl No.</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>ProviderAccount</TableHead>
          <TableHead>UserId</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>RefreshToken</TableHead>
          <TableHead>AccessToken</TableHead>
          <TableHead>ExpiresAt</TableHead>
          <TableHead>TokenType</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>IdToken</TableHead>
          <TableHead>SessionState</TableHead>
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
            {{ (item as any).provider }}
          </TableCell>
          <TableCell>
            {{ (item as any).providerAccountId }}
          </TableCell>
          <TableCell>
            {{ (item as any).userId }}
          </TableCell>
          <TableCell>
            {{ (item as any).type }}
          </TableCell>
          <TableCell>
            {{ (item as any).refresh_token }}
          </TableCell>
          <TableCell>
            {{ (item as any).access_token }}
          </TableCell>
          <TableCell>
            {{ (item as any).expires_at }}
          </TableCell>
          <TableCell>
            {{ (item as any).token_type }}
          </TableCell>
          <TableCell>
            {{ (item as any).scope }}
          </TableCell>
          <TableCell>
            {{ (item as any).id_token }}
          </TableCell>
          <TableCell>
            {{ (item as any).session_state }}
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
import { getVerificationTokens } from '~/utils/VerificationToken';

const data = ref()
onMounted(async () => {
  const result = await getVerificationTokens()
  data.value = (result as any).data
})
// console.log(data)

</script>

<style></style>