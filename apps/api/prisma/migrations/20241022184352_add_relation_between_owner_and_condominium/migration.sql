-- AddForeignKey
ALTER TABLE "condominiums" ADD CONSTRAINT "condominiums_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
