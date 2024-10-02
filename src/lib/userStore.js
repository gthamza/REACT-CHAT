import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      // Fetch user information from Firestore
      const userDocRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        set({ currentUser: userSnap.data(), isLoading: false });
      } else {
        console.log('No such user document!');
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
      set({ currentUser: null, isLoading: false });
    }
  },
}));

export default useUserStore;