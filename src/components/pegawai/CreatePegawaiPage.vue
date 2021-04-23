<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                DATA UMUM
              </v-col>
              <v-col cols="8" class="text--secondary">
                <v-fade-transition leave-absolute>
                  <span v-if="open" key="0">
                    RAHASIA
                  </span>
                  <span v-else key="1">
                    {{ trip.name }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-card flat>
              <v-form ref="form" @submit.prevent="submit">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="nik"
                        :rules="nikRules"
                        label="Nomor Induk Karyawan"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="noktp"
                        :rules="noKTPRules"
                        label="No. KTP"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="namalengkap"
                        :rules="textNoNullRules"
                        label="Nama Lengkap"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="namaPanggilan"
                        :rules="textNoNullRules"
                        label="Nama Panggilan"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="alamat" color="teal" :rules="textNoNullRules" >
                        <template v-slot:label>
                          <div>
                            Alamat <small>(diperinci)</small>
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="provinsis"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        hide-no-data
                        hide-selected
                        item-text="nama_kabupaten"
                        item-value="id"
                        label="Kabupaten"
                        placeholder="Nama Kabupaten"
                        prepend-icon="mdi-database-search"
                        return-object>    
                      </v-autocomplete>
                      <v-divider></v-divider>
                      <v-expand-transition>
                        <v-list v-if="provinsis" class="red lighten-3">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{provinsis.nama_kabupaten}}</v-list-item-title>
                              <v-list-item-subtitle>Kabupaten</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>{{provinsis.provinsi.nama_provinsi}}</v-list-item-title>
                              <v-list-item-subtitle>Provinsi</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-expand-transition>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="NO HP"
                        type="number"
                        v-model="nohp"
                        :rules="noHPRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-radio-group v-model="jenis_kelamin" jenis_kelamin>
                        <v-radio
                          label="LAKI-LAKI"
                          value="Pria"
                        ></v-radio>
                        <v-radio
                          label="PEREMPUAN"
                          value="Wanita"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="tempatLahir"
                        :rules="textNoNullRules"
                        label="Tempat Lahir"
                        required>    
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <template>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="tanggalLahir"
                              label="Tanggal Lahir"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="tanggalLahir"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
                      </template>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select 
                        v-model="agama"
                        :items="agamaItems"
                        :rules="textNoNullRules"
                        label="Agama"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select 
                        v-model="kawin"
                        :items="statusPerkawinanItems"
                        :rules="textNoNullRules"
                        label="Status Perkawinan"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-radio-group v-model="kewarganegaraan" kewarganegaraan>
                        <v-radio
                          label="WNI"
                          value="WNI"
                        ></v-radio>
                        <v-radio
                          label="WNA"
                          value="WNA"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select 
                        v-model="golonganDarah"
                        :items="golonganDarahItems"
                        :rules="textNoNullRules"
                        label="Golongan Darah"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="bahasa"
                        :rules="textNoNullRules"
                        label="Bahasa"
                        required>    
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Suku"
                        v-model="suku"
                        :rules="textNoNullRules"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Daerah Asal"
                        v-model="daerahasal"
                        :rules="imageRules"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-file-input label="Foto" v-model="image" @change="onFileChange"/>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-img :src="pegawaiImageUrl" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              KELUARGA
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Keluarga
                </span>
                <span v-else key="1">
                  {{ trip.location }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersDataKeluarga"
              :items="dataKeluarga"
              sort-by="Nama Keluarga"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>DATA KELUARGA</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dataKeluargaDialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">

                              <v-text-field v-model="dataKeluargaEditedItem.nama"
                              label="Nama Keluarga">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-radio-group v-model="dataKeluargaEditedItem.jenis_kelamin" dataKeluargaEditedItem.jenis_kelamin>
                                <v-radio label="LAKI-LAKI" value="Pria"></v-radio>
                                <v-radio label="PEREMPUAN" value="Wanita"></v-radio>
                              </v-radio-group>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <template>
                                <v-menu
                                  ref="menu"
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="dataKeluargaEditedItem.tanggal_lahir"
                                      label="Tanggal Lahir"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on">
                                        
                                    </v-text-field>
                                  </template>
                                  <v-date-picker
                                    ref="picker"
                                    v-model="dataKeluargaEditedItem.tanggal_lahir"
                                    :max="new Date().toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save">    
                                  </v-date-picker>
                                </v-menu>
                              </template> 
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select 
                                v-model="dataKeluargaEditedItem.hubungan"
                                :items="hubungans"
                                :rules="textNoNullRules"
                                label="Hubungan"
                                required>    
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="dataKeluargaEditedItem.pendidikan"
                                label="Pendidikan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="dataKeluargaEditedItem.pekerjaan"
                                :rules="textNoNullRules"
                                label="Pekerjaan"
                                required>
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDataKeluarga">
                          BATAL
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveDataKeluargaItem">
                          SIMPAN
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dataKeluargaDialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDeleteDataKeluarga">BATAL</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteDataKeluargaItemConfirm">HAPUS</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editDataKeluargaItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteDataKeluargaItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initializeDataKeluarga">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              KONTAK DARURAT
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open">Silahkan Masukkan Data Kontak Darurat</span>
                <v-row v-else no-gutters style="width: 100%">
                  <v-col cols="6">
                    ORANG KE I : <span v-if="kontakDarurat.length == 1">{{ kontakDarurat[0].nama_lengkap }}</span> 
                    <span v-else>Belum di isi</span>
                  </v-col>
                  <v-col cols="6">
                    ORANG KE II : <span v-if="kontakDarurat.length == 2">{{ kontakDarurat[1].nama_lengkap }}</span> 
                    <span v-else>Belum di isi</span>
                  </v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersKontakDarurat"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>DARURAT</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="kontakDaruratDialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="kontakDaruratEditedItem.nama_lengkap" label="Nama Lengkap">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="kontakDaruratEditedItem.hubungan" label="Hubungan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="kontakDaruratEditedItem.alamat_rumah" label="Alamat Rumah">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="kontakDaruratEditedItem.no_telp_rumah" label="No. Telp Rumah">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="kontakDaruratEditedItem.no_telp_kantor" label="No. Telp Kantor">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="kontakDaruratEditedItem.keterangan" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              RIWAYAT PENDIDIKAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Riwayat Pendidikan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersRiwayatPendidikan"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>PENDIDIKAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tingkat Pendidikan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nama Sekolah">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tempat">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jurusan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tahun Lulus">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              LOKAKARYA
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Seminar/Kursus
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersLokakarya"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>LOKAKARYA DILUAR HGI</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nama Kursus/Seminar">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Penyelenggaraan/Lokasi">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Mulai">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Selesai">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Lama(hari)">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              PENGALAMAN KERJA
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Pengalaman Kerja
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersPengalamanKerja"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>PENGALAMAN KERJA DILUAR PERUSAHAAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Dari Tahun">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Sampai Tahun">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Perusahaan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jabatan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Alasan Berhenti">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  DATA KEPEGAWAIAN
                </v-col>
                <v-col cols="8" class="text--secondary">
                  <v-fade-transition leave-absolute>
                    <span v-if="open" key="0">
                      RAHASIA
                    </span>
                    <span v-else key="1">
                      {{ trip.name }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <template>
              <v-card flat>
                <v-form ref="form" @submit.prevent="submit">
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <template>
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Tanggal Mulai Bekerja"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="date"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                        </template>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Level"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Divisi"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.first"
                          :rules="rules.name"
                          label="Seksi"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.last"
                          :rules="rules.name"
                          label="Bagian"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select 
                          v-model="form.favoriteAnimal"
                          :items="animals"
                          :rules="rules.animal"
                          color="pink"
                          label="Status Karyawan"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <template>
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Tanggal Pengangkatan"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="date"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                        </template>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select 
                          v-model="form.favoriteAnimal"
                          :items="animals"
                          :rules="rules.animal"
                          label="Nomor Rekening"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select 
                          v-model="form.favoriteAnimal"
                          :items="animals"
                          :rules="rules.animal"
                          label="No. BPJS Kesehatan"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select 
                          v-model="form.favoriteAnimal"
                          :items="animals"
                          :rules="rules.animal"
                          label="No. BPJS Ketenagakerjaan"
                          required
                        ></v-select>
                      </v-col>
                      
                    </v-row>
                  </v-container>
                </v-form>
              </v-card>
            </template>
          </v-expansion-panel-content>
      </v-expansion-panel>
      
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              RIWAYAT PEKERJAAN/JABATAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Riwayat Pekerjaan/Jabatan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersRiwayatPekerjaan"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>RIWAYAT PEKERJAAN/JABATAN DIDALAM PERUSAHAAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tipe">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Terhitung Mulai">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nomor SK">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jabatan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Departemen">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              PENGHARGAAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Riwayat Penghargaan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersRiwayatPenghargaan"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>PEMBERIAN PENGHARGAAN DARI PERUSAHAAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jenis Penghargaan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tanggal Diterima">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              TEGURAN LISAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Teguran Lisan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersTeguranLisan"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>TEGURAN LISAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jenis Pelanggaran">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tanggal Dikeluarkan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Kesalahan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              SURAT PERINGATAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Surat Peringatan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersSuratPeringatan"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>PEMBERIAN SURAT PERINGATAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jenis Surat Peringatan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tanggal Dikeluarkan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Masa Berlaku">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Kesalahan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              PENILAIAN KARYAWAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Penilaian Karyawan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersPenilaiian"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>PENILAIAN KARYAWAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tanggal">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nilai">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              ASET DIPINJAMKAN
            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0">
                  Silahkan Masukkan Data Aset yang Dipinjamkan
                </span>
                <span v-else key="1">
                  Terdapat {{ trip.length }} data
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <v-data-table
              :headers="headersAsetPerusahaan"
              :items="desserts"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>ASET PERUSAHAAN YANG DIPINJAMKAN</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on">
                        Buat Baru
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jenis">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tanggal Diberikan">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Nomor">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Jumlah">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Tanggal Berakhir">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.name" label="Keterangan">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close">
                          Cancel
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveItem">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin ingin menghapus baris ini?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </v-container>
</template>

<script>
  import { kabupatenService } from '@/_services';
  export default {
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        bio: '',
        favoriteAnimal: '',
        age: null,
        terms: false,
      })
      return {
        // FOR AUTO COMPLETE
        descriptionLimit: 60,
        entries: [],
        isLoading: false,
        provinsis: null,
        search: null,
        // END AUTO COMPLETE

        nik: "",
        nikRules: [
          (v) => v.length > 4 || "Isian angka yang anda masukkan tidak valid",
          (v) => Number.isInteger(Number(v)) || "Isian ini harus berupa angka",
          (v) => v > 0 || "Isian angka yang anda masukkan tidak valid ",
        ],

        noktp: "",
        noKTPRules: [
          (v) => v.length > 4 || "Isian angka yang anda masukkan tidak valid",
          (v) => Number.isInteger(Number(v)) || "Isian ini harus berupa angka",
          (v) => v > 0 || "Isian angka yang anda masukkan tidak valid ",
        ],

        namalengkap: "",
        namaPanggilan: "",
        alamat: "",
        textNoNullRules: [
          (v) => !!v || "Data isian tidak valid",
          (v) =>(v && v.length > 0) || "Data isian tidak bisa kosong",
        ],

        nohp: "",
        noHPRules: [
                  (v) => v.length == 12  || "Data Isian yang anda masukkan tidak valid",
          (v) => Number.isInteger(Number(v)) || "Isian ini harus berupa angka",
          (v) => v > 0 || "Isian angka yang anda masukkan tidak valid ",
        ],
        
        jenisKelamin: "Pria",
        
        tempatLahir: "",
        
        tanggalLahir: null,

        agamaItems: ["Islam", "Protestan", "Katolik", "Hindu", "Budha", "Lainnya"],
        agama: "",

        statusPerkawinanItems: ["Kawin", "Belum Kawin", "Cerai Hidup", "Cerai Mati"],
        kawin: "",

        kewarganegaraan: "WNI",
        
        golonganDarahItems: ["A", "AB", "B", "O"],
        golonganDarah: "",

        bahasa: "",

        suku: "",

        daerahasal: "",

        imageRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be le'
        ],
        image: undefined,
        pegawaiImageUrl: "",

        // DATA KELUARGA 
        headersDataKeluarga: [
        {
          text: 'Nama Keluarga',
          align: 'start',
          sortable: false,
          value: 'nama',
        },
        { text: 'Hubungan', value: 'hubungan' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
        { text: 'Tanggal Lahir', value: 'tanggal_lahir' },
        { text: 'Pendidikan', value: 'pendidikan' },
        { text: 'Pekerjaan', value: 'pekerjaan' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        dataKeluarga: [],
        dataKeluargaEditedIndex: -1,
        dataKeluargaDialog: false,
        dataKeluargaDialogDelete: false,
        dataKeluargaEditedItem: {
          nama: '',
          jenisKelamin: 'Pria',
          tanggalLahir: null,
          hubungan: "",
          pendidikan: "",
          pekerjaan: "",
        },
        dataKeluargaDefaultItem: {
          nama: '',
          jenisKelamin: 'Pria',
          tanggalLahir: null,
          hubungan: "",
          pendidikan: "",
          pekerjaan: "",
        },
        hubungans: [
        "Ayah", "Ibu", "Saudara", "Suami", "Istri", "Anak"
        ],
        // END DATA KELUARGA

        // DATA KONTAK DARURAT
        headersKontakDarurat: [
        {
          text: 'Nama Lengkap',
          align: 'start',
          sortable: false,
          value: 'nama_lengkap',
        },
        { text: 'Hubungan', value: 'hubungan' },
        { text: 'Alamat Rumah', value: 'alamat_rumah' },
        { text: 'No. Telp Rumah', value: 'no_telp_rumah' },
        { text: 'No. Telp Kantor', value: 'no_telp_kantor' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Aksi', value: 'aksi', sortable: false },
        ],
        kontakDarurat: [],
        kontakDaruratEditedIndex: -1,
        kontakDaruratDialog: false,
        kontakDaruratDialogDelete: false,
        kontakDaruratEditedItem: {
          nama_lengkap: '',
          hubungan: '',
          alamat_rumah: '',
          no_telp_rumah: '',
          no_telp_kantor: '',
          keterangan: '',
        },
        kontakDaruratDefaultItem: {
          nama_lengkap: '',
          hubungan: '',
          alamat_rumah: '',
          no_telp_rumah: '',
          no_telp_kantor: '',
          keterangan: ''
        },
        // END DATA KONTAK DARURAT


        menu: false,
        trip: {
          name: '',
          location: null,
          start: null,
          end: null,
        },
        locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
        form: Object.assign({}, defaultForm),
        rules: {
          age: [
            val => val < 10 || `I don't believe you!`,
          ],
          animal: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
        animals: ['Dog', 'Cat', 'Rabbit', 'Turtle', 'Snake'],
        conditions: false,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        snackbar: false,
        terms: false,
        defaultForm,
        dialog: false,
        dialogDelete: false,
        headers: [
        {
          text: 'Nama Keluarga',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Hubungan', value: 'calories' },
        { text: 'Jenis Kelamin', value: 'fat' },
        { text: 'Tanggal Lahir', value: 'carbs' },
        { text: 'Pendidikan', value: 'protein' },
        { text: 'Pekerjaan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        
        headersRiwayatPendidikan: [
        {
          text: 'Tingkat Pendidikan',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Nama Sekolah', value: 'calories' },
        { text: 'Tempat', value: 'fat' },
        { text: 'Jurusan', value: 'carbs' },
        { text: 'Tahun Lulus', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersLokakarya: [
        {
          text: 'Nama Kursus/Seminar',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Penyelenggaraan/Lokasi', value: 'calories' },
        { text: 'Tanggal Mulai', value: 'fat' },
        { text: 'Tanggal Selesai', value: 'carbs' },
        { text: 'Lama(hari)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersPengalamanKerja: [
        {
          text: 'Dari Tahun',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Sampai Tahun', value: 'calories' },
        { text: 'Perusahaan', value: 'fat' },
        { text: 'Jabatan', value: 'carbs' },
        { text: 'Alasan Berhenti', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersRiwayatPekerjaan: [
        {
          text: 'Tipe',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Terhitung Mulai', value: 'calories' },
        { text: 'Nomor SK', value: 'fat' },
        { text: 'Jabatan', value: 'carbs' },
        { text: 'Departemen', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersRiwayatPenghargaan: [
        {
          text: 'Jenis Pengharagaan',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Diterima', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersTeguranLisan: [
        {
          text: 'Jenis Pelanggaran',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Dikeluarkan', value: 'protein' },
        { text: 'Kesalahan', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersSuratPeringatan: [
        {
          text: 'Jenis Surat Peringatan',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Dikeluarkan', value: 'protein' },
        { text: 'Masa Berlaku', value: 'protein' },
        { text: 'Kesalahan', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersPenilaiian: [
        {
          text: 'Tanggal',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Nilai', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        headersAsetPerusahaan: [
                {
          text: 'Jenis',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Tanggal Diberikan', value: 'protein' },
        { text: 'Nomor', value: 'protein' },
        { text: 'Jumlah', value: 'protein' },
        { text: 'Tanggal Berakhir', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      }
    },
    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.favoriteAnimal &&
          this.form.terms
        )
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

      // auto complete feature
      fields () {
        if (!this.provinsis) return []

        return Object.keys(this.provinsis).map(key => {
          return {
            key, value: this.provinsis[key] || 'n/a',
          }
        })
      },

      items () {
        return this.entries.map( entry => {
          var lengthDesc = entry.nama_kabupaten + " -> " + entry.provinsi.nama_provinsi
          const Description = lengthDesc.length > this.descriptionLimit
            ? lengthDesc.slice(0, this.descriptionLimit) + '...'
            : lengthDesc

          return Object.assign({}, entry, { Description })
        })
      },
      // end of auto complete feature
    },
    methods: {

      // DATA KELUARGA TABLE OPERATION
      initializeDataKeluarga () {
        this.dataKeluarga = [];
      },
      saveDataKeluargaItem () {
        if (this.dataKeluargaEditedIndex > -1) {
          Object.assign(this.dataKeluarga[this.dataKeluargaEditedIndex], this.dataKeluargaEditedItem);
        } else {
          this.dataKeluarga.push(this.dataKeluargaEditedItem);
        }
        this.closeDataKeluarga();
      },
      editDataKeluargaItem (item) {
        this.dataKeluargaEditedIndex = this.dataKeluarga.indexOf(item)
        this.dataKeluargaEditedItem = Object.assign({}, item)
        this.dataKeluargaDialog = true
      },
      closeDataKeluarga() {
        this.dataKeluargaDialog = false
        this.$nextTick(() => {
          this.dataKeluargaEditedItem = Object.assign({}, this.dataKeluargaDefaultItem)
          this.dataKeluargaEditedIndex = -1
        })
      },
      closeDeleteDataKeluarga () {
        this.dataKeluargaDialogDelete = false
        this.$nextTick(() => {
          this.dataKeluargaEditedItem = Object.assign({}, this.dataKeluargaDefaultItem)
          this.dataKeluargaEditedIndex = -1
        })
      },
      deleteDataKeluargaItem (item) {
        this.dataKeluargaEditedIndex = this.dataKeluarga.indexOf(item)
        this.dataKeluargaEditedItem = Object.assign({}, item)
        this.dataKeluargaDialogDelete = true
      },
      deleteDataKeluargaItemConfirm () {
        this.dataKeluarga.splice(this.dataKeluargaEditedIndex, 1);
        this.closeDeleteDataKeluarga();
      },
      // END DATA KELUARGA TABLE OPERATION

      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
      save (date) {
        this.$refs.menu.save(date)
      },

      // FOR UPLOAD IMAGE FORM
      createImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.pegawaiImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    
      onFileChange(file) {
        
        console.log(this.tanggalLahir);

        if (!file) {
          return;
        }
        this.createImage(file);
      },
      // END FOR UPLOAD IMAGE FORM

      initialize () {
        this.desserts = [];
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      saveItem () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
    watch: {
      // FOR GENERAL DATEPICKER FEATURE
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      // END GENERAL DATEPICKER FEATURE

      // FOR DATA KELUARGA FEATURE
      dataKeluargaDialogDelete(val) {
        val || this.closeDeleteDataKeluarga()
      },

      // END FOR DATA KELUARGA FEATURE
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },

      // feature auto complete
      search (val) {

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true
        kabupatenService.searchAll(val).then(
          prov => {
            console.log(prov);
            this.isLoading = false;
            this.entries = prov; 
          },
          error => {
            this.errors = error
            this.isLoading = false;
          }
        );
        // Lazily load input items
        // fetch('https://api.publicapis.org/entries')
        //   .then(res => res.json())
        //   .then(res => {
        //     const { count, entries } = res
        //     this.count = count
        //     this.entries = entries
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        //   .finally(() => (this.isLoading = false))
      },
    },
  }
</script>