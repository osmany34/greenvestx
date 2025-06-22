use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::Addr;
use cw_storage_plus::Map;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub goal: u128,
    pub raised: u128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Investment {
    pub project_id: String,
    pub investor: String,
    pub amount: u128,
}

pub const PROJECTS: Map<String, Project> = Map::new("projects");
pub const INVESTMENTS: Map<(&[u8], &str), Investment> = Map::new("investments");