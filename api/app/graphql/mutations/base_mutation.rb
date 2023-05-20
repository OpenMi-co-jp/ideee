module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def self.authorized?(object, context)
      unless super && context[:current_user].present?
        raise GraphQL::ExecutionError, "Authentication required"
        return false
      end
    end
  end
end
