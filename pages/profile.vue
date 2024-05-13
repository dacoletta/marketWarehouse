<template>
    <div>
        <BackButton :label="C.PRODUCTS" :route="'/products'" :icon="'mdi-arrow-left'"></BackButton>
        <v-row class="justify-center align-center text-center">
            <v-col cols="12" md="5">
                <v-img id="profile-image"
                    :src="image"></v-img>
                <v-text-field v-model="lastName" :label="C.LASTNAME" readonly></v-text-field>
                <v-text-field v-model="firstName" :label="C.FIRSTNAME" readonly></v-text-field>
                <v-text-field v-model="username" :label="C.USERNAME" readonly></v-text-field>
                <v-text-field v-model="email" :label="C.EMAIL" readonly></v-text-field>
                <v-radio-group inline v-model="gender">
                    <v-radio label="M" value="M" id="genderM"></v-radio>
                    <v-radio label="F" value="F" id="genderF"></v-radio>
                </v-radio-group>

            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { CONSTANTS as C } from '~/constants/constants';
import { useProfileStore } from '~/store/profileStore';
import { parseJson } from '~/utils/data';
const profileStore = useProfileStore();
const getProfileValue = (): any => {
    let profileData = profileStore.profile;
    if (isEmptyObjectValues(profileData)) {
        profileData = parseJson(localStorage.getItem('profile'));
        profileStore.setProfileByStorage();
    }
    return profileData;
}
const profile = getProfileValue()
let { lastName, username, firstName, email, image } = profile;
const gender = getGender(profileStore.profile.gender);

// Force randomic image
if(!image) {
    image = `https://picsum.photos/200/300?random=${getRandomNumber()}`;
}
</script>

<style lang="scss" scoped>
#buttons-container {
    display: flex;
    justify-content: end;
}

#profile-image {
    margin-bottom: 2em;
    width: 300px;
    height: 300px !important;
    margin-right: auto;
    margin-left: auto
}
</style>
