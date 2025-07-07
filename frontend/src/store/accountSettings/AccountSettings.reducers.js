import { createSlice } from '@reduxjs/toolkit'
import {
  getMemberByIdAction, // Bestehende Action
  updateMemberByIDAction, // Deine neue Action
} from './AccountSettings.actions.js' // der Async‑Thunk, der die Mitgliederdaten lädt

// Export, damit andere Dateien (z. B. die Komponente) ihn als Fallback nutzen können
export const initialState = {
  editingField: null,
  firstName: 'Maximilian',
  lastName: 'Müller',
  profilePic: null, // URL oder File‑Objekt
  email: 'maximilian.mueller@web.de',
  password: {
    current: '',
    new: '',
    confirm: '',
  },
  error: null,
  isLoading: false,
}

const accountSettingsSlice = createSlice({
  name: 'accountSettings',
  initialState,
  reducers: {
    startEditing: (state, action) => {
      state.editingField = action.payload
    },
    cancelEditing: (state) => {
      state.editingField = null
    },
    updateField: (state, action) => {
      const { field, value } = action.payload

      if (field === 'password') {
        // value: { subField: 'current' | 'new' | 'confirm', subValue: string }
        const { subField, subValue } = value
        if (subField in state.password) {
          state.password[subField] = subValue
        }
      } else if (field in state) {
        state[field] = value
      }
    },
    saveEditing: (state) => {
      state.editingField = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer für getMemberByMailAction
      .addCase(getMemberByIdAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getMemberByIdAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null

        console.log(
          'COMPLETE ACTION PAYLOAD (getMemberByMail):',
          action.payload
        )
        console.log(
          'ACTION PAYLOAD TYPE (getMemberByMail):',
          typeof action.payload
        )

        const memberData = action.payload // Passt, wenn API direkt das Member-Objekt liefert

        if (memberData && memberData.firstName) {
          // Prüfen auf Gültigkeit der Daten
          console.log(
            'Updating Redux state with (getMemberByMail):',
            memberData
          )
          state.firstName = memberData.firstName
          state.lastName = memberData.lastName
          state.profilePic = memberData.profilePic
          state.email = memberData.email
          // Passwort und andere sensible/spezifische Felder würden hier normalerweise nicht direkt übernommen,
          // es sei denn, der Anwendungsfall erfordert es und die API gibt sie sicher zurück.
          // Nur Beispielhaft:
          // state.password = { ...state.password, current: '', new: '', confirm: '' }; // Oder nur zurücksetzen
          console.log(
            'State after update (getMemberByMail):',
            JSON.stringify(state)
          )
        } else {
          console.error(
            'MemberData is invalid for getMemberByMail:',
            memberData
          )
        }
      })
      .addCase(getMemberByIdAction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Fehler beim Laden der Mitgliederdaten.'
      })

      // --- NEU: Reducer für updateMemberProfileByMailAction ---
      .addCase(updateMemberByIDAction.pending, (state) => {
        state.isLoading = true // Zeigt an, dass ein Update läuft
        state.error = null // Fehler zurücksetzen
      })
      .addCase(updateMemberByIDAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null

        // Die Payload sollte hier das aktualisierte Member-Objekt vom Server sein
        // Wieder: Überprüfe, ob es in 'action.payload.data' liegt, falls du Axios nutzt
        const updatedMemberData = action.payload // Annahme: API gibt das aktualisierte Objekt direkt zurück

        console.log(
          'COMPLETE ACTION PAYLOAD (updateMemberProfileByMail):',
          action.payload
        )

        if (updatedMemberData && updatedMemberData.firstName) {
          console.log(
            'Updating Redux state with (updateMemberProfileByMail):',
            updatedMemberData
          )
          state.firstName = updatedMemberData.firstName
          state.lastName = updatedMemberData.lastName
          state.profilePic = updatedMemberData.profilePic
          state.email = updatedMemberData.email
          // Wenn das Passwort geändert wurde, müsstest du es hier im State zurücksetzen oder anpassen
          // state.password = { current: '', new: '', confirm: '' };
          console.log(
            'State after update (updateMemberProfileByMail):',
            JSON.stringify(state)
          )
        } else {
          console.error(
            'Updated member data is invalid for updateMemberProfileByMail:',
            updatedMemberData
          )
        }
      })
      .addCase(updateMemberByIDAction.rejected, (state, action) => {
        state.isLoading = false
        // Fehlermeldung aus der Rejected-Payload oder Standardmeldung
        state.error = action.payload || 'Fehler beim Aktualisieren des Profils.'
      })
  },
})

export const {
  startEditing,
  cancelEditing,
  updateField,
  saveEditing,
  clearError,
} = accountSettingsSlice.actions

export default accountSettingsSlice.reducer
