import { supabase } from "./supabaseClient";

export async function getItems() {
    const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("id", { ascending: false });

    if (error) throw error;
    return data;
}

export async function addItem(newItem) {
    const { data, error } = await supabase
        .from("items")
        .insert([{ ...newItem }])
        .select();

    if (error) throw error;
    return data;
}
// GKDFgGXzDSOwAG4c  supas
