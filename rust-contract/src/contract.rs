use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, StdResult, Deps, Binary, StdError};
use crate::msg::{InstantiateMsg, ExecuteMsg, QueryMsg};
use crate::state::{PROJECTS, Project, INVESTMENTS, Investment};

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::CreateProject { id, name, goal } => {
            let project = Project { id: id.clone(), name, goal, raised: 0 };
            PROJECTS.save(deps.storage, id, &project)?;
            Ok(Response::new().add_attribute("action", "create_project"))
        }
        ExecuteMsg::Invest { project_id, amount } => {
            let mut project = PROJECTS.load(deps.storage, project_id.clone())?;
            project.raised += amount;
            PROJECTS.save(deps.storage, project_id.clone(), &project)?;

            let investment = Investment { project_id, investor: info.sender.to_string(), amount };
            INVESTMENTS.save(deps.storage, (info.sender.as_bytes(), &investment.project_id), &investment)?;
            Ok(Response::new().add_attribute("action", "invest"))
        }
    }
}

pub fn query(
    deps: Deps,
    _env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetProject { id } => {
            let project = PROJECTS.load(deps.storage, id)?;
            cosmwasm_std::to_binary(&project)
        }
    }
}