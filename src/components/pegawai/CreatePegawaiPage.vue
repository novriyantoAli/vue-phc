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
                        label="Nomor Induk Karyawan"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="NO. KTP"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.first"
                        :rules="rules.name"
                        color="purple darken-2"
                        label="Nama Lengkap"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.last"
                        :rules="rules.name"
                        color="blue darken-2"
                        label="Nama Panggilan"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="form.bio" color="teal">
                        <template v-slot:label>
                          <div>
                            Alamat <small>(diperinci)</small>
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select 
                        v-model="form.favoriteAnimal"
                        :items="animals"
                        :rules="rules.animal"
                        color="pink"
                        label="Provinsi"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select 
                        v-model="form.favoriteAnimal"
                        :items="animals"
                        :rules="rules.animal"
                        color="pink"
                        label="Kabupaten/Kota"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="NO HP"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-radio-group v-model="row" row>
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
                        label="Tempat Lahir"
                        type="number"
                      ></v-text-field>
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
                              label="Tanggal Lahir"
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
                        color="pink"
                        label="Agama"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select 
                        v-model="form.favoriteAnimal"
                        :items="animals"
                        :rules="rules.animal"
                        color="pink"
                        label="Status Perkawinan"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-radio-group v-model="row" row>
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
                      <v-select 
                        v-model="form.favoriteAnimal"
                        :items="animals"
                        :rules="rules.animal"
                        color="pink"
                        label="Golongan Darah"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Bahasa"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Suku"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Daerah Asal"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-file-input v-model="image" @change="onFileChange" />
                      <v-img :src="imageUrl" />
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox
                        v-model="form.terms"
                        color="green"
                      >
                        <template v-slot:label>
                          <div @click.stop="">
                            Do you accept the
                            <a href="#" @click.prevent="terms = true">terms</a>and<a href="#" @click.prevent="conditions = true">conditions?</a>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-btn text @click="resetForm">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!formIsValid"
                    text
                    color="primary"
                    type="submit"
                  >Register
                  </v-btn>
                </v-card-actions>
              </v-form>
              <v-dialog v-model="terms" width="70%">
                <v-card>
                  <v-card-title class="title">
                    Terms
                  </v-card-title>
                  <v-card-text v-for="n in 5" :key="n">
                    {{ content }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="purple" @click="terms = false">
                      Ok
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="conditions" width="70%">
                <v-card>
                  <v-card-title class="title">
                    Conditions
                  </v-card-title>
                  <v-card-text v-for="n in 5" :key="n" >
                    {{ content }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      text
                      color="purple"
                      @click="conditions = false"
                    >Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">
            DATA KELUARGA
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
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>KELUARGA</v-toolbar-title>
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
                            <v-text-field v-model="editedItem.name" label="Nama Keluarga">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-radio-group v-model="row" row>
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
                                    v-model="date"
                                    label="Tanggal Lahir"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on">
                                  </v-text-field>
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="date"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1950-01-01"
                                  @change="save">
                                </v-date-picker>
                              </v-menu>
                            </template>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select 
                              v-model="form.favoriteAnimal"
                              :items="animals"
                              :rules="rules.animal"
                              color="pink"
                              label="Hubungan"
                              required></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Pendidikan">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Pekerjaan">
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
            KONTAK DARURAT
          </v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span v-if="open">Silahkan Masukkan Data Kontak Darurat</span>
              <v-row v-else no-gutters style="width: 100%">
                <v-col cols="6">
                  ORANG KE I : {{ trip.start || 'Belum di isi' }}
                </v-col>
                <v-col cols="6">
                  ORANG KE II : {{ trip.end || 'Belum di isi' }}
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
                            <v-text-field v-model="editedItem.name" label="Nama Lengkap">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Hubungan">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Alamat Rumah">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="No. Telp Rumah">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="No. Telp Kantor">
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
            PNEGALAMAN KERJA
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
  </v-expansion-panels>
  </v-container>
</template>

<script>
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
        row: null,
        image: undefined,
        imageUrl: "",
        date: null,
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
        headersKontakDarurat: [
        {
          text: 'Nama Lengkap',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Hubungan', value: 'calories' },
        { text: 'Alamat Rumah', value: 'fat' },
        { text: 'No. Telp Rumah', value: 'carbs' },
        { text: 'No. Telp Kantor', value: 'protein' },
        { text: 'Keterangan', value: 'protein' },
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
    },
    methods: {
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
      createImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      onFileChange(file) {
        if (!file) {
          return;
        }
        this.createImage(file);
      },

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
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  }
</script>